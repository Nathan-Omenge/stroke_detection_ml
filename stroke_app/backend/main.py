from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="Stroke Prediction API", description="API for predicting stroke risk")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load("model/stroke_detection_model.pkl")

# Define input schema - matches model feature order
class StrokeInput(BaseModel):
    age: float
    hypertension: int
    heart_disease: int
    avg_glucose_level: float
    bmi: float
    gender_Male: int
    gender_Other: int
    ever_married_Yes: int
    work_type_Never_worked: int
    work_type_Private: int
    work_type_Self_employed: int
    work_type_children: int
    Residence_type_Urban: int
    smoking_status_formerly_smoked: int
    smoking_status_never_smoked: int
    smoking_status_smokes: int

@app.get("/")
def home():
    return {"message": "Stroke Prediction API is running"}

@app.post("/predict")
def predict(input_data: StrokeInput):

    # Arrange features in the exact order the model expects
    data = np.array([[
        input_data.age,
        input_data.hypertension,
        input_data.heart_disease,
        input_data.avg_glucose_level,
        input_data.bmi,
        input_data.gender_Male,
        input_data.gender_Other,
        input_data.ever_married_Yes,
        input_data.work_type_Never_worked,
        input_data.work_type_Private,
        input_data.work_type_Self_employed,
        input_data.work_type_children,
        input_data.Residence_type_Urban,
        input_data.smoking_status_formerly_smoked,
        input_data.smoking_status_never_smoked,
        input_data.smoking_status_smokes
    ]])

    prediction = model.predict(data)[0]
    probability = model.predict_proba(data)[0][1]

    return {
        "stroke_prediction": int(prediction),
        "stroke_probability": float(probability)
    }