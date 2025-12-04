# Stroke Detection ML Project

A machine learning web application that predicts stroke risk based on patient health data. The project includes data analysis, model training, and a full-stack web application with a FastAPI backend and React frontend.

## Project Overview

This project uses machine learning to predict stroke risk based on various health factors including age, hypertension, heart disease, glucose levels, BMI, and lifestyle factors. The system provides both a prediction (high/low risk) and a probability score.

## Dataset

The project uses the Healthcare Dataset Stroke Data containing:
- **Original dataset**: `healthcare-dataset-stroke-data.csv`
- **Cleaned dataset**: `cleaned_stroke_dataset.csv`
- **Features**: Age, gender, hypertension, heart disease, marriage status, work type, residence type, glucose level, BMI, smoking status
- **Target**: Stroke occurrence (binary classification)

## Project Structure

```
stroke_detection_ml/
├── data/
│   ├── healthcare-dataset-stroke-data.csv    # Original dataset
│   └── cleaned_stroke_dataset.csv            # Preprocessed dataset
├── notebooks/
│   ├── stroke_model.ipynb                    # Complete ML pipeline
│   └── model_features.json                   # Model feature specifications
├── stroke_app/
│   ├── backend/                              # FastAPI backend
│   │   ├── main.py                          # API endpoints
│   │   ├── model/
│   │   │   └── stroke_detection_model.pkl   # Trained model
│   │   ├── requirements.txt                 # Backend dependencies
│   │   └── utils.py                         # Utility functions
│   └── frontend/                            # React frontend
│       ├── src/                             # React components
│       ├── public/                          # Static assets
│       ├── package.json                     # Frontend dependencies
│       └── README.md                        # Frontend documentation
├── requirements.txt                          # Project dependencies
└── README.md                                # This file
```

## Machine Learning Pipeline

The ML pipeline includes:

1. **Data Exploration & Analysis** - Understanding data distribution and patterns
2. **Data Cleaning** - Handling missing values and outliers
3. **Feature Engineering** - Creating categorical encodings and feature scaling
4. **Model Selection** - Comparing different algorithms
5. **Hyperparameter Tuning** - Optimizing model performance
6. **Model Evaluation** - Using appropriate metrics for imbalanced data

### Model Features
The trained model uses these 16 features:
- `age` - Patient age
- `hypertension` - Hypertension status (0/1)
- `heart_disease` - Heart disease status (0/1)
- `avg_glucose_level` - Average glucose level
- `bmi` - Body Mass Index
- `gender_Male` - Gender encoding
- `gender_Other` - Gender encoding
- `ever_married_Yes` - Marriage status encoding
- `work_type_Never_worked` - Work type encoding
- `work_type_Private` - Work type encoding
- `work_type_Self_employed` - Work type encoding
- `work_type_children` - Work type encoding
- `Residence_type_Urban` - Residence type encoding
- `smoking_status_formerly_smoked` - Smoking status encoding
- `smoking_status_never_smoked` - Smoking status encoding
- `smoking_status_smokes` - Smoking status encoding

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd stroke_detection_ml
```

2. **Set up Python environment**
```bash
# Create virtual environment
python -m venv stroke_venv

# Activate virtual environment
# On macOS/Linux:
source stroke_venv/bin/activate
# On Windows:
stroke_venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

3. **Set up Backend**
```bash
cd stroke_app/backend
pip install -r requirements.txt
```

4. **Set up Frontend**
```bash
cd stroke_app/frontend
npm install
```

## Running the Application

### Start the Backend Server
```bash
cd stroke_app/backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
The API will be available at `http://localhost:8000`

### Start the Frontend Development Server
```bash
cd stroke_app/frontend
npm start
```
The web application will be available at `http://localhost:3000`

## API Usage

### Health Check
```bash
GET http://localhost:8000/
```

### Stroke Prediction
```bash
POST http://localhost:8000/predict
Content-Type: application/json

{
    "age": 45.0,
    "hypertension": 0,
    "heart_disease": 0,
    "avg_glucose_level": 85.0,
    "bmi": 25.5,
    "gender_Male": 1,
    "gender_Other": 0,
    "ever_married_Yes": 1,
    "work_type_Never_worked": 0,
    "work_type_Private": 1,
    "work_type_Self_employed": 0,
    "work_type_children": 0,
    "Residence_type_Urban": 1,
    "smoking_status_formerly_smoked": 0,
    "smoking_status_never_smoked": 1,
    "smoking_status_smokes": 0
}
```

**Response:**
```json
{
    "stroke_prediction": 0,
    "stroke_probability": 0.15
}
```

## Model Performance

The model has been trained and validated using appropriate metrics for imbalanced classification:
- Cross-validation for robust performance estimation
- Precision, Recall, and F1-score evaluation
- ROC-AUC for probability calibration
- Confusion matrix analysis

## Data Science Notebooks

### `stroke_model.ipynb`
Complete data science pipeline including:
- Exploratory Data Analysis (EDA)
- Data preprocessing and cleaning
- Feature engineering and selection
- Model training and evaluation
- Hyperparameter tuning
- Model deployment preparation

## Technologies Used

### Data Science & ML
- **Python** - Core programming language
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **Scikit-learn** - Machine learning algorithms
- **Matplotlib/Seaborn** - Data visualization
- **Jupyter Notebook** - Interactive development

### Backend
- **FastAPI** - Modern, fast web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Joblib** - Model serialization

### Frontend
- **React** - User interface library
- **JavaScript/HTML/CSS** - Web technologies

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Nathan Omenge - [Your Email]

Project Link: [https://github.com/yourusername/stroke_detection_ml](https://github.com/yourusername/stroke_detection_ml)

## Acknowledgments

- Healthcare Dataset Stroke Data providers
- Scikit-learn community
- FastAPI and React communities
- Open source contributors

---

**Disclaimer**: This application is for educational and research purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.