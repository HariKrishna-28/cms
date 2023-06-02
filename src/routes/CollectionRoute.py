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


class Item(BaseModel):
    name: str


client = mongo_db_client_connection()
db = client.userSchemas
collection_name = db["user-schemas"]


# create a new collection for each users to store their schemas
@router.post("/new/{userId}")
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


# get all collection or a specific collection based on user id
@router.get("/get-all/{userId}")
async def get_all(request: Request, userId: int, colId: str | None = None):
    try:
        collection_name = db[str(userId)]
        if (colId is None):
            data = serialise(list(collection_name.find()))
        else:
            data = serialise(
                list(collection_name.find({"_id": ObjectId(colId)})))
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})
