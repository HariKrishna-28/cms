from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.schema.PostSchema import PostSchema
from src.util.DatabaseConnection import mongo_db_client_connection
import json
from datetime import datetime
from bson import ObjectId
from src.util.serialise import serialise

router = APIRouter()


# class Item(BaseModel):
#     name: str


client = mongo_db_client_connection()
db = client.cms
collection_name = db["posts"]


@router.get("/")
async def get_posts():
    return JSONResponse(content={"message": "Posts"}, status_code=200)


@router.post("/new")
async def new_post(request: Request, items: PostSchema):
    try:
        items_json = items.dict()
        items_json["createdAt"] = datetime.utcnow()
        items_json["updatedAt"] = datetime.utcnow()
        res = collection_name.insert_one(items_json)
        return JSONResponse(status_code=200, content=str(res.inserted_id))
    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})


# Other route handlers for the PostRoute

# Additional routes and handlers can be added here

# You can define more routers in this module if needed

# Example of another router
# another_router = APIRouter()
# Define routes for the another_router

# You can export multiple routers from this module if needed
# __all__ = ["router", "another_router"]
