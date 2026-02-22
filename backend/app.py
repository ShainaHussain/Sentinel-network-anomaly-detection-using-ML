from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Load model
MODEL_PATH = os.path.join('model', 'best_ids_model.pkl')
ENCODERS_PATH = os.path.join('model', 'encoders.pkl')
FEATURES_PATH = os.path.join('model', 'feature_names.pkl')

print("Loading model...")
try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
    with open(ENCODERS_PATH, 'rb') as f:
        encoders = pickle.load(f)
    with open(FEATURES_PATH, 'rb') as f:
        feature_names = pickle.load(f)
    print("✅ Model loaded successfully!")
except FileNotFoundError as e:
    print(f"❌ Error: Model files not found. Please add .pkl files to backend/model/")
    print(f"   Missing: {e.filename}")

# Database setup
def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            prediction TEXT,
            confidence REAL,
            protocol TEXT,
            service TEXT,
            flag TEXT,
            src_bytes INTEGER,
            dst_bytes INTEGER
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def home():
    return jsonify({
        'status': 'running',
        'message': 'Sentinel IDS Backend Active',
        'model_loaded': 'model' in dir()
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Convert to DataFrame
        df = pd.DataFrame([data])
        
        # Encode categorical columns
        for col in ['protocol_type', 'service', 'flag']:
            if col in df.columns and col in encoders:
                df[col] = encoders[col].transform(df[col])
        
        # Ensure correct column order
        df = df[feature_names]
        
        # Predict
        prediction = model.predict(df)[0]
        probability = model.predict_proba(df)[0]
        confidence = max(probability) * 100
        
        result = 'Attack' if prediction == 1 else 'Normal'
        
        # Save to database
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO predictions (timestamp, prediction, confidence, protocol, service, flag, src_bytes, dst_bytes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            result,
            confidence,
            data.get('protocol_type', 'unknown'),
            data.get('service', 'unknown'),
            data.get('flag', 'unknown'),
            data.get('src_bytes', 0),
            data.get('dst_bytes', 0)
        ))
        conn.commit()
        conn.close()
        
        return jsonify({
            'prediction': result,
            'confidence': round(confidence, 2),
            'is_attack': bool(prediction == 1)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM predictions")
    total = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM predictions WHERE prediction='Attack'")
    attacks = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM predictions WHERE prediction='Normal'")
    normal = cursor.fetchone()[0]
    
    conn.close()
    
    return jsonify({
        'total': total,
        'attacks': attacks,
        'normal': normal,
        'attack_rate': round((attacks/total*100) if total > 0 else 0, 2)
    })

@app.route('/api/recent', methods=['GET'])
def get_recent():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM predictions ORDER BY timestamp DESC LIMIT 20')
    
    results = []
    for row in cursor.fetchall():
        results.append({
            'id': row[0],
            'timestamp': row[1],
            'prediction': row[2],
            'confidence': row[3],
            'protocol': row[4],
            'service': row[5],
            'flag': row[6],
            'src_bytes': row[7],
            'dst_bytes': row[8]
        })
    
    conn.close()
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)