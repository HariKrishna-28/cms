from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.PostRoute import router as post_router
from fastapi.responses import JSONResponse
from src.util.DatabaseConnection import mongo_db_client_connection

app = FastAPI()
app.add_middleware(CORSMiddleware)


@app.on_event('startup')
async def root():
    mongo_db_client_connection()


@app.get("/")
async def root():
    return JSONResponse(content={"message": "Server up"}, status_code=500)


app.include_router(post_router, prefix="/api/posts")


# uvicorn main:app --reload
