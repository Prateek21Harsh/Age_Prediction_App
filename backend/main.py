from fastapi import FastAPI
import cv2
import numpy as np
import tensorflow as tf
import base64
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5500",  # local frontend
    os.getenv("FRONTEND_URL"),  # vercel frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading model...")
# For local setup use: ../model/age_model.keras
model = tf.keras.models.load_model("model/age_model.keras")
print("Model loaded.")

age_labels = [
"0-10",
"11-20",
"21-30",
"31-40",
"41-50",
"50+"
]

@app.post("/predict")
async def predict(data: dict):

    img_data = base64.b64decode(data['image'])
    nparr = np.frombuffer(img_data,np.uint8)
    img = cv2.imdecode(nparr,cv2.IMREAD_COLOR)
    if img is None:
        return {"error": "Invalid image"}
    img = cv2.resize(img,(224,224))
    img = img/255.0
    img = np.expand_dims(img,axis=0)
    pred = model.predict(img)
    age = age_labels[np.argmax(pred)]

    return {"age_range":age}