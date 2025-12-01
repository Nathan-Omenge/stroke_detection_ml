import React, { useState } from 'react';
import './StrokeForm.css';

const StrokeForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    hypertension: '0',
    heart_disease: '0',
    avg_glucose_level: '',
    bmi: '',
    gender: 'Female',
    ever_married: 'No',
    work_type: 'Private',
    residence_type: 'Urban',
    smoking_status: 'never smoked'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const convertToModelFeatures = (data) => {
    return {
      age: parseFloat(data.age),
      hypertension: parseInt(data.hypertension),
      heart_disease: parseInt(data.heart_disease),
      avg_glucose_level: parseFloat(data.avg_glucose_level),
      bmi: parseFloat(data.bmi),
      gender_Male: data.gender === 'Male' ? 1 : 0,
      gender_Other: data.gender === 'Other' ? 1 : 0,
      ever_married_Yes: data.ever_married === 'Yes' ? 1 : 0,
      work_type_Never_worked: data.work_type === 'Never_worked' ? 1 : 0,
      work_type_Private: data.work_type === 'Private' ? 1 : 0,
      work_type_Self_employed: data.work_type === 'Self-employed' ? 1 : 0,
      work_type_children: data.work_type === 'children' ? 1 : 0,
      Residence_type_Urban: data.residence_type === 'Urban' ? 1 : 0,
      smoking_status_formerly_smoked: data.smoking_status === 'formerly smoked' ? 1 : 0,
      smoking_status_never_smoked: data.smoking_status === 'never smoked' ? 1 : 0,
      smoking_status_smokes: data.smoking_status === 'smokes' ? 1 : 0
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const modelFeatures = convertToModelFeatures(formData);
      
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modelFeatures),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stroke-form-container">
      <h1>Stroke Risk Prediction</h1>
      
      <form onSubmit={handleSubmit} className="stroke-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
              max="120"
              placeholder="Enter age"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hypertension">Hypertension</label>
            <select
              id="hypertension"
              name="hypertension"
              value={formData.hypertension}
              onChange={handleChange}
              required
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="heart_disease">Heart Disease</label>
            <select
              id="heart_disease"
              name="heart_disease"
              value={formData.heart_disease}
              onChange={handleChange}
              required
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ever_married">Ever Married</label>
            <select
              id="ever_married"
              name="ever_married"
              value={formData.ever_married}
              onChange={handleChange}
              required
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="work_type">Work Type</label>
            <select
              id="work_type"
              name="work_type"
              value={formData.work_type}
              onChange={handleChange}
              required
            >
              <option value="Never_worked">Never Worked</option>
              <option value="children">Children</option>
              <option value="Govt_job">Government Job</option>
              <option value="Private">Private</option>
              <option value="Self-employed">Self-employed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="residence_type">Residence Type</label>
            <select
              id="residence_type"
              name="residence_type"
              value={formData.residence_type}
              onChange={handleChange}
              required
            >
              <option value="Rural">Rural</option>
              <option value="Urban">Urban</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="smoking_status">Smoking Status</label>
            <select
              id="smoking_status"
              name="smoking_status"
              value={formData.smoking_status}
              onChange={handleChange}
              required
            >
              <option value="never smoked">Never Smoked</option>
              <option value="formerly smoked">Formerly Smoked</option>
              <option value="smokes">Currently Smokes</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="avg_glucose_level">Glucose Level (mg/dL)</label>
            <input
              type="number"
              id="avg_glucose_level"
              name="avg_glucose_level"
              value={formData.avg_glucose_level}
              onChange={handleChange}
              required
              min="50"
              max="300"
              step="0.1"
              placeholder="e.g., 120.5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bmi">BMI</label>
            <input
              type="number"
              id="bmi"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              required
              min="10"
              max="60"
              step="0.1"
              placeholder="e.g., 25.3"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Analyzing...' : 'Predict Stroke Risk'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {prediction && (
        <div className="prediction-result">
          <h2>Prediction Result</h2>
          <div className={`risk-level ${prediction.stroke_prediction === 1 ? 'high-risk' : 'low-risk'}`}>
            <p>
              <strong>Stroke Risk: </strong>
              {prediction.stroke_prediction === 1 ? 'HIGH RISK' : 'LOW RISK'}
            </p>
            <p>
              <strong>Risk Probability: </strong>
              {(prediction.stroke_probability * 100).toFixed(1)}%
            </p>
          </div>
          <p className="disclaimer">
            <em>This is a prediction model for educational purposes only. 
            Please consult with healthcare professionals for medical advice.</em>
          </p>
        </div>
      )}
    </div>
  );
};

export default StrokeForm;