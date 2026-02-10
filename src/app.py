import json
from ulid import ULID
import boto3
import os

ses = boto3.client("ses")
dynamodb = boto3.resource("dynamodb")

TABLE = os.environ["TABLE_NAME"]
DOMAIN = os.environ["DOMAIN"]

CORS_HEADERS = {
    "Access-Control-Allow-Origin": f"https://{DOMAIN}",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
}

def lambda_handler(event, context):

    method = event.get("requestContext", {}).get("http", {}).get("method")

    # Handle CORS preflight
    if method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": ""
        }

    try:
        body = json.loads(event.get("body", "{}"))
    except:
        body = {}

    submission_id = str(ULID())

    table = dynamodb.Table(TABLE)
    table.put_item(
        Item={
            "submission_id": submission_id,
            "data": body
        }
    )

    ses.send_email(
        Source=f"forms@{DOMAIN}",
        Destination={"ToAddresses": [f"martinezdynamics@{DOMAIN}"]},
        Message={
            "Subject": {"Data": "New Form Submission"},
            "Body": {"Text": {"Data": json.dumps(body)}}
        }
    )
    print(CORS_HEADERS)

    return {
        "statusCode": 200,
        "headers": CORS_HEADERS,
        "body": json.dumps({"status": "ok"})
    }
