from pydantic import BaseModel


class UserCollectionSchema(BaseModel):
    name: str
    ownerId: str
    fields: list[str]
