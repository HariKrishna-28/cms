from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/")
async def get_posts():
    return JSONResponse(content={"message": "Server up"}, status_code=200)


# Other route handlers for the PostRoute

# Additional routes and handlers can be added here

# You can define more routers in this module if needed

# Example of another router
# another_router = APIRouter()
# Define routes for the another_router

# You can export multiple routers from this module if needed
# __all__ = ["router", "another_router"]
