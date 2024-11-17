from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from openai import OpenAI
from dotenv import load_dotenv

app = Flask(__name__)
# CORS(app)
CORS(app, origins="http://localhost:3000")

# Load environment variables from .env file
load_dotenv()

# Define the path to the datasets
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PATENTS_FILE = os.path.join(BASE_DIR, 'datasets', 'patents.json')
COMPANY_PRODUCTS_FILE = os.path.join(BASE_DIR, 'datasets', 'company_products.json')

# Load the JSON data
with open(PATENTS_FILE, 'r') as f:
    patents = json.load(f)

with open(COMPANY_PRODUCTS_FILE, 'r') as f:
    companyProducts = json.load(f)


# This will use the api key from environment variable
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@app.route('/check', methods=['POST'])

def check_infringement():
    data = request.json
    patent_id = data.get('patentID')
    company_name = data.get('companyName')

    # Find the patent
    patent = next((p for p in patents if p['publication_number'] == patent_id), None)
    if not patent:
        message = f"Patent ID {patent_id} not found"
        return jsonify(message)

    # Find the company
    company = next((c for c in companyProducts['companies'] if company_name.lower() in c['name'].lower()), None)
    if not company:
        message = f"Company {company_name} not found"
        return jsonify(message)

    # Compare products with the patent description
    results = []
    for product in company['products']:
        prompt = (
            f"The following is a patent claims: {patent['claims']}.\n\n"
            f"The following is the product description: {product['description']}.\n\n"
            f"By comparing {patent['claims']} and {product['description']}, does the product '{product['name']}' infringe on the patent? "
            "Please give a clear yes or no answer. If the answer is yes, explain why. If the answer is no, simply state 'No infringement found.'"
        )
        response = client.chat.completions.create(
            # model="gpt-3.5-turbo",
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],  
            max_tokens=300,
            temperature=0.7
        )
        # Extract the model's response and check if it indicates infringement
        reason = response.choices[0].message.content.strip().lower()
        if "yes" in reason:  # The model indicates infringement
            results.append({
                "product": product['name'],
                "reason": reason
            })

    # Sort and return top 2 results, or message if no results
    sorted_results = sorted(results, key=lambda x: len(x['reason']), reverse=True)[:2]
    if len(sorted_results) == 0:
        return jsonify([{"product": "No matches found", "reason": "None of the company's products appear to infringe on this patent."}])
    return jsonify(sorted_results)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
    # app.run(debug=True)