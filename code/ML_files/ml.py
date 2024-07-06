import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
from joblib import dump


data = pd.read_csv("sorted_training3.csv")



X = data.drop(columns=["prognosis"])  # Features
y = data["prognosis"]  # Target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


naive_bayes_classifier = MultinomialNB()
naive_bayes_classifier.fit(X_train, y_train)

# y_pred = naive_bayes_classifier.predict(X_test)
# accuracy = accuracy_score(y_test, y_pred)
# print("Accuracy:", accuracy)


# print("\nClassification Report:")
# print(classification_report(y_test, y_pred))


dump(naive_bayes_classifier, "naive_bayes_model.joblib")
