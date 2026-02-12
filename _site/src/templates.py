from jinja2 import Environment, FileSystemLoader, select_autoescape
from functools import lru_cache

TEMPLATE_DIR = "templates"


@lru_cache
def get_env():
    return Environment(
        loader=FileSystemLoader(TEMPLATE_DIR),
        autoescape=select_autoescape(["html", "xml"])
    )


def render_template(name: str, context: dict) -> str:
    env = get_env()
    template = env.get_template(name)
    return template.render(**context)


def render_form_email(form) -> dict:
    """
    Returns:
        {
            "subject": str,
            "text": str,
            "html": str | None
        }
    """

    form_type = getattr(form, "form_type")

    subject_map = {
        "contact": "New Contact Submission",
        "consulting": "New Consulting Inquiry",
    }

    subject = subject_map.get(form_type, "New Form Submission")

    context = form.model_dump()

    text = render_template(f"{form_type}.txt.j2", context)

    try:
        html = render_template(f"{form_type}.html.j2", context)
    except Exception:
        html = None

    return {
        "subject": subject,
        "text": text,
        "html": html
    }
