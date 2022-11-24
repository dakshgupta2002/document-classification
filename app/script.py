from PIL import Image
from pytesseract import pytesseract
import os
from pathlib import Path
import pypdfium2 as pdfium
import base64
import pypdfium2 as pdfium

path_to_tesseract = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
pytesseract.tesseract_cmd = path_to_tesseract


def extract_from_image(b64, filename):
    res = base64.b64decode(b64)
    text=""
    
    try:
        result = open('res.jpg', 'wb')
        result.write(res)
        result.close()
        
        img = Image.open('res.jpg')
        text += pytesseract.image_to_string(img)
    except:
        print(error)
        
    return text

def extract_from_pdf(b64, filename):
    res = base64.b64decode(b64)
    text=""
    
    try:
        result = open('res.jpg', 'wb')
        result.write(res)
        result.close()
        
        pdf = pdfium.PdfDocument('res.jpg')
        for page_number in range(len(pdf)):
            page = pdf.get_page(page_number)
            pil_image = page.render_topil(scale=1, rotation=0, crop=(0, 0, 0, 0), greyscale=False, optimise_mode=pdfium.OptimiseMode.NONE,)
            pil_image.save("image.png")
            img = Image.open("image.png")
            text += pytesseract.image_to_string(img)
    except:
        print(error)
        
    return text
