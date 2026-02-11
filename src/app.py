import json
import boto3
import os
from ulid import ULID
from models import FormEnvelope
from templates import render_form_email

ses = boto3.client("ses")
dynamodb = boto3.resource("dynamodb")

TABLE = os.environ["TABLE_NAME"]
SENDER_EMAIL = os.environ["SENDER_EMAIL"]
RECEIVER_EMAIL = os.environ["RECEIVER_EMAIL"]


def lambda_handler(event, context):

    method = event.get("requestContext", {}).get("http", {}).get("method")

    # OPTIONS handled by Lambda URL CORS — return empty
    if method == "OPTIONS":
        return {"statusCode": 200, "body": ""}

    try:
        payload = json.loads(event.get("body") or "{}")
        envelope = FormEnvelope.model_validate(payload)
        form = envelope.data
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid payload"})
        }

    # Honeypot spam check
    if getattr(form, "website", None):
        return {"statusCode": 200, "body": json.dumps({"status": "ok"})}

    submission_id = str(ULID())

    dynamodb.Table(TABLE).put_item(
        Item={
            "submission_id": submission_id,
            "form_type": form.form_type,
            "data": form.model_dump()
        }
    )

    email = render_form_email(form)

    body = {
        "Text": {"Data": email["text"]}
    }

    if email.get("html"):
        body["Html"] = {"Data": email["html"]}

    ses.send_email(
        Source=SENDER_EMAIL,
        Destination={"ToAddresses": [RECEIVER_EMAIL]},
        Message={
            "Subject": {"Data": email["subject"]},
            "Body": body
        }
    )

    return {
        "statusCode": 200,
        "body": json.dumps({"status": "ok"})
    }
