from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.schema.CollectionsSchema import UserCollectionSchema
from src.util.DatabaseConnection import mongo_db_client_connection
import json
from datetime import datetime
from src.util.serialise import serialise

router = APIRouter()


class Item(BaseModel):
    name: str


client = mongo_db_client_connection()
db = client.userSchemas
# collection_name = db["user-schemas"]


@router.get("/")
async def get_posts():
    return JSONResponse(content={"message": "Server up"}, status_code=200)


@router.post("/new-collection/{userId}")
async def create_collection(request: Request, userId: int):
    try:
        print(userId)
        item_json = await request.json()
        item_json["createdAt"] = datetime.utcnow()
        item_json["updatedAt"] = datetime.utcnow()
        collection_name = db[str(userId)]
        res = collection_name.insert_one(item_json)
        inserted_id = str(res.inserted_id)
        return JSONResponse(status_code=200, content=inserted_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})


@router.get("/get-all-collection/{userId}")
async def get_all(request: Request, userId: int):
    try:
        collection_name = db[str(userId)]
        data = serialise(list(collection_name.find()))
        # for document in data:
        #     # Convert ObjectId to string
        #     document["_id"] = str(document["_id"])
        return data
        # return JSONResponse(status_code=200, content=data)
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
