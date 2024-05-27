from flask import Flask, request, jsonify
from gensim.models import KeyedVectors
from scipy.linalg import triu

app = Flask(__name__)

# Load the pre-trained word2vec model (it may take some time to load)
model = KeyedVectors.load_word2vec_format('models/GoogleNews-vectors-negative300.bin.gz', binary=True)

@app.route('/vectorize', methods=['POST'])
def vectorize():
    data = request.get_json()
    words = data.get('words', [])
    vectors = []
    
    for word in words:
        if word in model:
            vectors.append(model[word].tolist())
        else:
            vectors.append([0] * 300)  # Handle unknown words with zero vector
    
    return jsonify({'vectors': vectors})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
