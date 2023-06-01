def serialise(data):
    for document in data:
        # Convert ObjectId to string
        document["_id"] = str(document["_id"])
    return data
