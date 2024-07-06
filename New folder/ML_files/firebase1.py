import firebase_admin
from firebase_admin import credentials, db
import csv
import json
import pandas as pd
from joblib import load
import time


cred=credentials.Certificate('configure.json')
firebase_admin.initialize_app(cred,{'databaseURL':'https://healthy-6686f-default-rtdb.firebaseio.com/'})

model = load("naive_bayes_model.joblib")
# Function to convert CSV to JSON with prefixed keys to preserve order
# Function to convert CSV to JSON with prefixed keys to preserve order
def csv_to_json(csv_file):
    data = []
    with open(csv_file, 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            # Exclude the 'prognosis' column if present
            if 'prognosis' in row:
                del row['prognosis']
            data.append(row)
    return data
# Function to store JSON data in Firebase
def store_data_in_firebase(data, db_path):
    ref = db.reference(db_path)
    ref.set(data)
    print("Data uploaded to Firebase successfully.")

# Function to perform inference
def perform_inference(data):
    # Convert data to DataFrame
    print(data)
    df = pd.DataFrame(data)
    print(df)

    # Drop the 'prognosis' column
    # if 'prognosis' in df.columns:
    #     df.drop(columns=['prognosis'], inplace=True)
    
    # # Print DataFrame contents to CSV file
    # output_csv = "data_for_inference.csv"  # Define the output CSV file path
    # df.to_csv(output_csv, index=False)  # Write DataFrame to CSV file without row indices

    # Perform inference
    predictions = model.predict(df)

    return predictions.tolist()

# Function to fetch questions from Firebase, perform inference, and store results back in Firebase
def process_questions():
    # Fetch questions from Firebase
    ref = db.reference("/")
    questions_data = ref.get()
    # print(list(questions_data.keys()))
    for user in list(questions_data):
        ref=db.reference("/" + user)
        user_data = ref.get()
        if 'Questions' in list(user_data.keys()):
            questions_data = user_data['Questions']
            predictions = perform_inference(questions_data)
            store_data_in_firebase(predictions, "/" + user + "/Inferences")

    # if questions_data:
    #     # Perform inference
    #     predictions = perform_inference(questions_data)

    #     # Store inference results back in Firebase
    #     store_data_in_firebase(predictions, "/user/Inferences")

if __name__ == '__main__':
    while True:
        # csv_file="sorted_testing.csv"
        # json_data = csv_to_json(csv_file)

        # db_path="/user2/Questions"
        # store_data_in_firebase(json_data, db_path)
        # time.sleep(10)
        process_questions()

    # ref=db.reference("/user1/")
    # questions_data = ref.get()
    # print(questions_data)
    # questions=questions_data['Questions']
    # print(questions)
    # # predictions = perform_inference(questions)
    # store_data_in_firebase(predictions, "/user1/Inferences")
        # time.sleep(60)