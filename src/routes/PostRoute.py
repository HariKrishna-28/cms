from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.schema.PostSchema import PostSchema, DeletePostSchema
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
        body = await request.json()
        colId = body.get("collectionId")

        col = collection_name.find({"collectionId": colId})
        collection = serialise(list(col))

        if len(collection) != 0:
            body_data = body.get("fields")
            fields = []
            for i in body_data:
                fields.append(i)
            for item in collection:
                val = item["fields"]
                for i in val:
                    fields.append(i)

            for i in collection:
                i["fields"] = fields
                i["updatedAt"] = datetime.utcnow()

            res = collection_name.find_one_and_update({"collectionId": colId}, {
                "$set": {"fields": fields, "updatedAt": datetime.utcnow()}})
            return JSONResponse(status_code=200, content={"message": "updated"})

        else:
            body["createdAt"] = datetime.utcnow()
            body["updatedAt"] = datetime.utcnow()
            res = collection_name.insert_one(body)
            # res = collection_name.insert_one(item_data)
            inserted_id = str(res.inserted_id)
            return JSONResponse(status_code=200, content=inserted_id)

    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})


@router.get("/get-post/{postId}")
async def get_posts(postId: str):
    try:
        result = serialise(
            list(collection_name.find({"_id": ObjectId(postId)})))
        for i in result:
            val = i
        return val

    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})


@router.put("/update/{postId}")
async def update_post(postId: str):
    try:
        pass
    except Exception as e:
        raise JSONResponse(status_code=500, detail={"message": str(e)})


@router.delete("/delete/{postId}")
async def delete_post(item: DeletePostSchema, postId: str):
    try:
        data = item.dict()
        ownerId = data.get("ownerId")
        collection_data = list(collection_name.find(
            {"$and": [
                {"_id": ObjectId(postId)},
                {"userId": ownerId}
            ]}))

        if len(collection_data) == 0:
            return JSONResponse(status_code=404, content={"message": "collection not found or it doesn't belong to you"})

        collection_name.find_one_and_delete({"_id": ObjectId(postId)})
        return JSONResponse(status_code=200, content={"message": "successfully deleted the post"})

    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})
