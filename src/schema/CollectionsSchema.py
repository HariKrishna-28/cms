from pydantic import BaseModel
from datetime import datetime


class FieldLists(BaseModel):
    name: str
    type: str


class UserCollectionSchema(BaseModel):
    name: str
    ownerId: str
    fields: list[FieldLists]
    createdAt: datetime
    updatedAt: datetime
