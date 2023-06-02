from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.schema.CollectionsSchema import UserCollectionSchema
from src.util.DatabaseConnection import mongo_db_client_connection
import json
from datetime import datetime
from bson import ObjectId
from src.util.serialise import serialise

router = APIRouter()


# class Item(BaseModel):
#     name: str


# client = mongo_db_client_connection()
# db = client.userSchemas
# collection_name = db["user-schemas"]


@router.get("/")
async def get_posts():
    return JSONResponse(content={"message": "Posts"}, status_code=200)


# Other route handlers for the PostRoute

# Additional routes and handlers can be added here

# You can define more routers in this module if needed

# Example of another router
# another_router = APIRouter()
# Define routes for the another_router

# You can export multiple routers from this module if needed
# __all__ = ["router", "another_router"]
