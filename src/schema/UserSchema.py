from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class UserDataSchema(BaseModel):
    displayName: str
    email: str
    photoURL: str
    createdAt: Optional[datetime] = None
