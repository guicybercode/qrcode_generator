# QR Code Generator Web Application

## Abstract

This project implements a bilingual web-based QR code generation system utilizing Python's Flask framework. The application features a retro computing aesthetic with Windows 95/98 visual elements, providing an intuitive interface for generating Quick Response (QR) codes from textual input. The system supports automatic language detection and manual language switching between English and Portuguese, with a responsive design optimized for various screen sizes.

## Architecture

### System Overview

The application follows a client-server architecture pattern with a Python backend and a JavaScript-enhanced frontend. The backend utilizes Flask as the web framework, handling HTTP requests and QR code generation through the `qrcode` library. The frontend implements a bilingual interface with automatic language detection based on browser settings, with manual override capabilities.

### Technology Stack

- **Backend Framework**: Flask 2.3.0+
- **QR Code Generation**: qrcode 7.4.2+ with Pillow 10.0.0+ for image processing
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Image Format**: PNG (Portable Network Graphics)

### Project Structure

```
gerador_qrcode/
├── app.py                 # Flask application entry point
├── templates/
│   └── index.html        # Main HTML template with bilingual content
├── static/
│   ├── css/
│   │   └── style.css     # Retro Windows 90s styling
│   └── js/
│       └── main.js       # Client-side logic (language detection, QR display)
├── requirements.txt      # Python package dependencies
└── README.md            # This documentation
```

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Modern web browser with JavaScript enabled

### Setup Instructions

1. Clone or download the project directory:
   ```bash
   cd gerador_qrcode
   ```

2. Create a virtual environment (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Verify installation:
   ```bash
   python app.py
   ```

5. Access the application:
   - Open a web browser
   - Navigate to `http://localhost:5000`

## Usage

### Basic Operation

1. **Input Data**: Enter the text or data you wish to encode into a QR code in the terminal-style input field.

2. **Generate QR Code**: Click the "Generate QR Code" button (or press Ctrl+Enter) to create the QR code.

3. **View Result**: The generated QR code will appear in the display area below the input field.

4. **Download**: Click the "Download PNG" button to save the QR code as a PNG image file.

### Language Selection

The application automatically detects the user's browser language preference:
- Portuguese browsers (pt-BR, pt-PT, etc.) default to Portuguese interface
- All other languages default to English

Users can manually toggle between English and Portuguese using the language button in the title bar. The selected language preference is stored in browser localStorage for persistence across sessions.

### API Endpoints

#### GET `/`
Serves the main application interface.

**Response**: HTML page (text/html)

#### POST `/generate`
Generates a QR code from provided data.

**Request Body** (JSON):
```json
{
  "data": "text to encode"
}
```

**Response** (JSON):
```json
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

**Error Response** (JSON, status 400):
```json
{
  "error": "No data provided"
}
```

## Technical Specifications

### QR Code Parameters

- **Version**: 1 (21x21 modules minimum)
- **Error Correction Level**: L (Low, ~7% recovery)
- **Box Size**: 10 pixels per module
- **Border**: 4 modules
- **Color Scheme**: Black modules on white background

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Responsive Design

The application implements responsive design principles:
- Desktop: Centered layout with side borders (800px max-width)
- Mobile/Tablet: Full-width layout, side borders hidden (< 768px viewport)

## Dependencies

### Production Dependencies

- **Flask** (>=2.3.0): Lightweight WSGI web application framework
- **qrcode** (>=7.4.2): QR code image generator
- **Pillow** (>=10.0.0): Python Imaging Library for image processing

### Development Notes

The application runs in debug mode by default (`app.run(debug=True)`). For production deployment, disable debug mode and configure a production WSGI server (e.g., Gunicorn, uWSGI).

## Design Philosophy

### Aesthetic Approach

The user interface implements a Windows 95/98 retro computing aesthetic:

- Gray color palette (#C0C0C0, #808080, #000080)
- 3D beveled borders (inset/outset effects)
- Classic system fonts (MS Sans Serif style)
- Window frames with title bars
- Raised/pressed button effects
- Light color scheme with white input fields and gray backgrounds

### Layout Design

The application implements a centered container layout with fixed vertical borders on the left and right sides of the viewport, creating a framed presentation reminiscent of terminal windows and classic desktop environments.

## Future Enhancements

Potential improvements for future versions:
- Custom QR code color schemes
- Adjustable QR code size and error correction levels
- Batch QR code generation
- QR code scanning/decoding functionality
- Export formats (SVG, PDF)
- QR code history/logging

## License

This project is provided as-is for educational and personal use.

## References

- QR Code Standard: ISO/IEC 18004
- Flask Documentation: https://flask.palletsprojects.com/
- qrcode Library: https://github.com/lincolnloop/python-qrcode

---

## Korean Verse (한국어 성경 구절)

**요한복음 3장 16절 (John 3:16)**

하나님이 세상을 이처럼 사랑하사 독생자(獨生子)를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생(永生)을 얻게 하려 하심이라

**한자 (漢字) 포함:**

하나님이 世界를 이처럼 愛하사 獨生子를 주셨으니 이는 그를 信하는 者마다 滅亡하지 않고 永生을 얻게 하려 하심이라

