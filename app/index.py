from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel


class Image(BaseModel):
    base64: str


app = FastAPI()


@app.post("/extract/image")
async def create_item(image: Image):
    text = ""
    
    return text
     
