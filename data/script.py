from PIL import Image
from pytesseract import pytesseract
import csv 
import os
from pathlib import Path
from os.path import exists as file_exists
import pypdfium2 as pdfium

rootdir = Path('C:/Users/sid/Desktop/test')
path_to_tesseract = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
pytesseract.tesseract_cmd = path_to_tesseract

data = open('data.csv', 'w')
write = csv.writer(data)
header = ["Text", "Type of Document"]
write.writerow(header)

for (root,dirs,files) in os.walk('.', topdown=True):
    for file in files:
        text = ""
        path = root + '/' + file
        if (path in ['./.DS_Store', './data.csv', './script.py']):
            continue
        if (path.split('.')[-1] == 'pdf' or path.split('.')[-1] == 'PDF'):
            pdf = pdfium.PdfDocument(path)
            for page_number in range(len(pdf)):
                page = pdf.get_page(page_number)
                pil_image = page.render_topil(scale=1, rotation=0, crop=(0, 0, 0, 0), greyscale=False, optimise_mode=pdfium.OptimiseMode.NONE,)
                pil_image.save("image.png")
                img = Image.open("image.png")
                text += pytesseract.image_to_string(img)
        else:
            img = Image.open(path)
            text += pytesseract.image_to_string(img)
            
        text = text.replace("\n"," ")
        docClass =path.split('/')[0][2:]
        print(docClass)
        row = [text, docClass]
        # print(text, 'ID CARD')
        write.writerow(row)
        
        