import requests
import base64
import os

# This is where our server is running
BASE_URL = "http://localhost:8000"

def test_document_verification():
    print("Starting document verification test...")
    
    # Path to our mock document
    document_path = "tests/test_documents/mock_id_card.txt"
    
    # Check if our test document exists
    if not os.path.exists(document_path):
        print(f"❌ Error: Could not find the test document at {document_path}")
        return
    
    print("✅ Found the test document!")
    
    # Read the document and convert it to a format the server can understand
    with open(document_path, "rb") as f:
        document_data = base64.b64encode(f.read()).decode('utf-8')
    
    print("✅ Document read successfully!")
    
    # Prepare the data to send to the server
    data = {
        "document_type": "id_card",
        "document_data": document_data,
        "user_id": "test_user_123"
    }
    
    print("Sending request to server...")
    
    try:
        # Send the request to the server
        response = requests.post(
            f"{BASE_URL}/api/verify-document",
            json=data
        )
        
        # Print the results
        print("\n📋 Test Results:")
        print(f"Status Code: {response.status_code}")
        print(f"Server Response: {response.json()}")
        
        if response.status_code == 200:
            print("✅ Test passed! Server responded successfully!")
        else:
            print("❌ Test failed! Server returned an error.")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        print("Make sure the server is running at http://localhost:8000")

if __name__ == "__main__":
    print("🔍 Document Verification Test")
    print("=============================")
    test_document_verification() 