# Installation to run the server
```pip3 install fastapi pydantic "uvicorn[standard]"```  

# Running the server 
```uvicorn index:app --reload```   
- Run the **app** instance of the fastapi server from **index.py** file!  

# Voila! The API to classify the files is listening on port 8000.  

# Installation to extract the text 
``` pip3 install pytesseract Pillow pypdfium2```