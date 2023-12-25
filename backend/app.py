from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd
import io
import base64

app = Flask(__name__)
CORS(app)

# MongoDB connection setup
client = MongoClient('mongodb://localhost:27017/')
db = client['Terminal']
collection = db['draw-chart']

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    # Process the file - save to filesystem or MongoDB
    # For example, to save in MongoDB:
    # collection.insert_one({'file_name': file.filename, 'file_data': file.read()})
    csv_data = pd.read_csv(io.StringIO(file.read().decode('utf-8')))

    # Convert CSV data to string
    csv_as_string = csv_data.to_csv(index=False)
    file_info = {
        'file_name': file.filename,
        'file_data': csv_as_string
    }
    collection.insert_one(file_info)
    return 'File uploaded successfully!'

if __name__ == '__main__':
    app.run(debug=True)