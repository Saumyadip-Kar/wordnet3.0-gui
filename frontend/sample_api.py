from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import nltk
from nltk.corpus import wordnet as wn

app = FastAPI()

# CORS (Allow React to communicate with FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Route 
@app.get("/messages")
async def read_message():
    return {"message": "Hello from FastAPI!"}


# Request model
class TextInput(BaseModel):
    text: str

# API to reverse the string
@app.post("/reverse")
async def reverse_string(data: TextInput):
    return {"reversed_text": data.text[::-1]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)

#To run the api backend -- python main.py 
#To run the front end and also using api -- npm run dev
