from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class FieldLists(BaseModel):
    name: str
    data: Optional[str] | Optional[int] | Optional[bool] | Optional[List[int]
                                                                    ] | Optional[List[bool]] | Optional[List[str]] = None


class PostSchema(BaseModel):
    userId: str
    collectionId: str
    fields: list[FieldLists]
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None


class DeletePostSchema(BaseModel):
    ownerId: str
