from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from src.util.DatabaseConnection import mongo_db_client_connection
from src.schema.UserSchema import UserDataSchema
from datetime import datetime
from src.util.serialise import serialise


router = APIRouter()

client = mongo_db_client_connection()
db = client.cms
collection_name = db["user"]


@router.post("/initialise")
async def initialise_user(request: Request, data: UserDataSchema):
    try:
        print(data)
        user_existing = collection_name.find_one(
            {"displayName": data.displayName})
        if user_existing:
            return {"message": "Username already exists."}
        data_dict = data.dict()
        data_dict["createdAt"] = datetime.utcnow()
        res = collection_name.insert_one(data_dict)
        inserted_id = str(res.inserted_id)
        return JSONResponse(status_code=200, content=inserted_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail={"message": str(e)})
