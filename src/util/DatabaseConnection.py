from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()
database_url = os.getenv("MONGO_URL")
# client = MongoClient(database_url, server_api=ServerApi('1'))
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

# db = client.cms


def mongo_db_client_connection():

    # Create a new client and connect to the server
    client = MongoClient(database_url, server_api=ServerApi('1'))

    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

    return client


# client = MongoClient(database_url)
# db = client["cms"]
