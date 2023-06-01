from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from src.schema.CollectionsSchema import UserCollectionSchema
from src.util.DatabaseConnection import mongo_db_client_connection

router = APIRouter()


class Item(BaseModel):
    name: str


client = mongo_db_client_connection()
db = client.cms
collection_name = db["user-schemas"]


@router.get("/")
async def get_posts():
    return JSONResponse(content={"message": "Server up"}, status_code=200)


@router.post("/new-collection")
async def create_collection(request: Request):
    try:
        item_json = await request.json()
        res = collection_name.insert_one(item_json)
        inserted_id = str(res.inserted_id)
        return JSONResponse(status_code=200, content=inserted_id)
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=500, detail=str(e))

# Other route handlers for the PostRoute

# Additional routes and handlers can be added here

# You can define more routers in this module if needed

# Example of another router
# another_router = APIRouter()
# Define routes for the another_router

# You can export multiple routers from this module if needed
# __all__ = ["router", "another_router"]
