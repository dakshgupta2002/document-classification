from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from script import extract_from_image, extract_from_pdf, classify_image, classify_pdf
from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "*"
]


class Image(BaseModel):
    filename: str
    b64: str


class Pdf(BaseModel):
    filename: str
    b64: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return {
        "Fast": "Vibe",
        "hello": "Welcome to the fastapi server",
        "services": {
            "extract text from image": "/extract/image",
            "extract text from pdf": "/extract/pdf",
            "classify the file": "/classify/"
        },
        "Thank you": "for using this service"
    }


@app.post("/extract/image")
async def index(image: Image):
    return {"text": extract_from_image(image.b64, image.filename)}


@app.post("/extract/pdf")
async def index(pdf: Pdf):
    return {"text": extract_from_pdf(pdf.b64, pdf.filename)}


@app.post("/classify/image")
async def index(image: Image):
    return {"class": classify_image(image.b64, image.filename)}


@app.post("/classify/pdf")
async def index(pdf: Pdf):
    return {"text": classify_pdf(pdf.b64, pdf.filename)}
