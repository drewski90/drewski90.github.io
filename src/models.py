from pydantic import BaseModel, EmailStr, Field
from typing import Literal, Union

class BaseForm(BaseModel):
    form_type: str
    website: str | None = None  # honeypot


class ContactForm(BaseForm):
    form_type: Literal["contact"]
    name: str
    email: EmailStr
    message: str
    company: str | None = None


class ConsultingForm(BaseForm):
    form_type: Literal["consulting"]
    name: str
    email: EmailStr
    budget: str
    timeline: str
    description: str


FormUnion = Union[ContactForm, ConsultingForm]

class FormEnvelope(BaseModel):
    data: FormUnion = Field(discriminator="form_type")
