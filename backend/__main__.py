from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from pydantic import BaseModel
import uvicorn
from backend.operations import *

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
# @app.get("/messages")
# async def read_message():
#     return {"message": "Hello from FastAPI!"}

# ---------- Serve React Frontend (production) ----------
# frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend/dist"))

# # Mount assets (like /assets/*.js, *.css)
# app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")

# # Catch-all route for frontend (SPA fallback)
# @app.get("/{full_path:path}")
# async def serve_spa(full_path: str):
#     index_path = os.path.join(frontend_dist, "index.html")
#     if os.path.exists(index_path):
#         return FileResponse(index_path)
#     return {"detail": "index.html not found"}

#------------------------------------------------------------------------------------------------------------------
# Request model
class TextInput(BaseModel):
    text: str

# API to reverse the string
# @app.post("/reverse")
# async def reverse_string(data: TextInput):
#     return {"reversed_text": data.text[::-1]}

# API to reverse the string
@app.post("/Info")
async def get_info(data: TextInput):
    return {"Info": get_word_info(data.text)}

#Knowledge Graph
@app.post("/KG")
async def get_info(data: TextInput):
    return {"KG": generate_knowledge_graph(data.text)}
#Hypernym Tree
@app.post("/Hypernym-Tree")
async def get_hypernym_tree(data: TextInput):
    return {"KG": get_hypernym_tree_data(data.text)}
@app.post("/Hypernym-Tree-Text")
async def get_hypernym_tree_text(data: TextInput):
    print("Got Until This")
    return {"TreeInfo": get_hypernym_tree_data_text(data.text)}


#Hypernym Tree
@app.post("/Hyponym-Tree")
async def get_hyponym_tree(data: TextInput):
    return {"KG": get_hyponym_tree_data(data.text)}
@app.post("/Hyponym-Tree-Text")
async def get_hyponym_tree_text(data: TextInput):
    return {"TreeInfo": get_hyponym_tree_data_text(data.text)}


#  Meronym Tree
@app.post("/Meronym-Tree")
async def get_meronym_tree(data: TextInput):
    return {"KG": get_meronym_tree_data(data.text)}

@app.post("/Meronym-Tree-Text")
async def get_meronym_tree_text(data: TextInput):
    return {"TreeInfo": get_meronym_tree_data_text(data.text)}


# Load words into memory once
with open("./assets/wordnet_words.txt", "r") as file:
    WORDS = [line.strip() for line in file]

@app.get("/suggestions")
async def get_suggestions(query: str):
    query = query.lower()
    suggestions = [word for word in WORDS if word.startswith(query)][:10]  # Limit results
    #print(suggestions)
    return {"suggestions": suggestions}


if __name__ == "__main__":
    #uvicorn.run("backend.__main__:app", host="0.0.0.0", port=8000)
    uvicorn.run(app, host="localhost", port=8000)

#To run the api backend -- python -m backend
#To run the front end and also using api -- npm run dev
