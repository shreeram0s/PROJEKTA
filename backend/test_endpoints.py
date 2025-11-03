import requests
import json

# Test the analyze endpoint with a non-existent analysis ID
try:
    response = requests.post('http://127.0.0.1:8000/api/analyze/', 
                             json={'analysis_id': 999})
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")

# Test the analyze endpoint with an existing analysis ID
try:
    response = requests.post('http://127.0.0.1:8000/api/analyze/', 
                             json={'analysis_id': 1})
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")