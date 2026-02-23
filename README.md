# Sentinel - Network Anomaly Detection System

Machine learning-based intrusion detection system using NSL-KDD dataset achieving 98%+ accuracy.

## Project Structure
```
├── frontend/          # Next.js dashboard
├── backend/           # Flask API + ML model
├── notebooks/         # Jupyter notebooks for training
└── README.md
```

## Setup & Run

### Backend (Python/Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend runs at: `http://localhost:5000`

### Frontend (Next.js)
```bash
cd frontend
pnpm install
pnpm run dev
```
Frontend runs at: `http://localhost:3000`

## Features
- ✅ Real-time network anomaly detection
- ✅ 98%+ accuracy using Random Forest
- ✅ Interactive dashboard
- ✅ Attack history tracking
- ✅ Statistical analysis

## Tech Stack
- **Backend:** Flask, scikit-learn, pandas, SQLite
- **Frontend:** Next.js, TypeScript, TailwindCSS
- **ML Model:** Random Forest trained on NSL-KDD dataset

## Model Performance
- Training Accuracy: 99.2%
- Validation Accuracy: 98.7%
- Test Accuracy: 98.5%
- No overfitting detected

## API Endpoints
- `POST /api/predict` - Predict if connection is attack or normal
- `GET /api/stats` - Get overall statistics
- `GET /api/recent` - Get recent predictions