from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.schema.CollectionsSchema import UserCollectionSchema, DeleteCollectionSchema
from src.util.DatabaseConnection import mongo_db_client_connection
import json
from datetime import datetime
from bson import ObjectId
from src.util.serialise import serialise

router = APIRouter()


class Item(BaseModel):
    name: str


client = mongo_db_client_connection()
db = client.cms
collection_name = db["user-schemas"]


# create a new collection for each users to store their schemas
@router.post("/new/")
async def create_collection(request: Request, item: UserCollectionSchema):
    try:
        item_data = item.dict()
        owner_id, name = item_data.get("ownerId"), item_data.get("name")
        collection_data = list(collection_name.find(
            {"$and": [
                {"ownerId": owner_id},
                {"name": name}
            ]}))
        if len(collection_data) == 1:
            return JSONResponse(status_code=409, content={"message": "There is already a collection with the same name"})
        else:
            item_data["createdAt"] = datetime.utcnow()
            item_data["updatedAt"] = datetime.utcnow()
            res = collection_name.insert_one(item_data)
            inserted_id = str(res.inserted_id)
            return JSONResponse(status_code=200, content=inserted_id)

    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})


# get all collection or a specific collection based on user id
@router.get("/get-all/{userId}")
async def get_all(request: Request, userId: str, colId: str | None = None):
    try:
        # collection_name = db[str(userId)]
        if (colId is None):
            data = serialise(
                list(collection_name.find({"ownerId": userId})))
        else:
            data = serialise(
                list(collection_name.find({"_id": ObjectId(colId)})))
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})


@router.delete("/delete/{collectionId}")
async def delete_collection(request: Request, items: DeleteCollectionSchema, collectionId: str):
    try:
        userData = items.dict()

        name, ownerId = userData["name"], userData["ownerId"]
        collection_data = list(collection_name.find(
            {"$and": [
                {"_id": ObjectId(collectionId)},
                {"ownerId": ownerId}
            ]}))

        if len(collection_data) == 0:
            return JSONResponse(status_code=404, content={"message": "collection not found or it doesn't belong to you"})

        collection_name.find_one_and_delete({"_id": ObjectId(collectionId)})
        db["posts"].find_one_and_delete({"collectionId": collectionId})
        return JSONResponse(status_code=200, content={"message": "successfully deleted the collection and its corresponding posts"})

    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})
