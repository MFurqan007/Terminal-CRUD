from flask import Flask, jsonify, request
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

@app.route('/load_csv/<file_name>', methods=['POST'])
def load_csv(file_name):
    # data_types = {
    #     "Date": str,  # Assuming 'Date' should be a string
    #     "Price": float,
    #     "Open": float,
    #     "High": float,
    #     "Low": float,
    #     "Vol.": str,  # Assuming 'Vol.' should be a string
    #     "Change %": str  # Assuming 'Change %' should be a string
    # }
    # file_object = collection.find_one({'_id': file_id})
    dataCol = request.get_json()
    print(dataCol)
    file_object = collection.find_one({'file_name': file_name}, {'_id': 0})
    result = []
    if (file_object):
        csv_data = file_object['file_data']
        csv_as_file = io.StringIO(csv_data)
        # df = pd.read_csv(csv_as_file, dtype=data_types)
        df = pd.read_csv(csv_as_file)

        print("Inferred dtypes: ",df.dtypes)
        print("Df: ", df)

        df = df.infer_objects()
        # Specified columns taken from the request
        # columns = ['Date', 'Price', 'Open']
        columns = dataCol

        x = columns[0]
        y = columns[1:]
        print("x: ", x)
        print("y: ", y)
        selecteddf = df[columns]
        print("Selected Columns Datatypes: \n", selecteddf.dtypes)
        print("Selected DF: ", selecteddf)
        # setting the x axis is string
        selecteddf[x] = selecteddf[x].astype("string")
        print("Date Datatype: ", selecteddf[x].dtype)
        # checking if all the columns in the y axis have the same data type
        same_data_type = True
        data_type = None
        # print("Selected Columns Datatypes: \n", selecteddf.dtypes)
        for col in y:
            current_type = selecteddf[col].dtype
            print(col, "current dt: ", current_type)
            if data_type is None:
                data_type = current_type
            elif current_type != data_type:
                same_data_type = False
                break

        if same_data_type:
            print("All columns have the same data type:", data_type)
            # arranges the data for the chart in frontend
            for _, row in selecteddf.iterrows():
                item = {x: row[x]}
                for col in y:
                    if col != x:  # Exclude 'name' column from adding to attributes
                        item[col] = row[col]
                result.append(item)

            print(result)
        else:
            print("Columns have different data types.")
            return "Y Columns have different data types"


    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)