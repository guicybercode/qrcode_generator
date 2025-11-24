from flask import Flask, render_template, request, jsonify, send_file
import qrcode
import io
import base64

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json.get('data', '')
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    img_buffer = io.BytesIO()
    img.save(img_buffer, format='PNG')
    img_buffer.seek(0)
    
    img_base64 = base64.b64encode(img_buffer.getvalue()).decode('utf-8')
    
    return jsonify({'image': f'data:image/png;base64,{img_base64}'})

if __name__ == '__main__':
    app.run(debug=True)

