const translations = {
    en: {
        title: 'QR Code Generator',
        inputPlaceholder: 'Enter text or data to encode...',
        generateBtn: 'Generate QR Code',
        downloadBtn: 'Download PNG',
        inputData: 'Input Data',
        generatedQR: 'Generated QR Code',
        errorEmpty: 'Please enter some data to generate QR code.',
        errorRequest: 'Error generating QR code. Please try again.'
    },
    pt: {
        title: 'Gerador de QR Code',
        inputPlaceholder: 'Digite texto ou dados para codificar...',
        generateBtn: 'Gerar QR Code',
        downloadBtn: 'Baixar PNG',
        inputData: 'Dados de Entrada',
        generatedQR: 'QR Code Gerado',
        errorEmpty: 'Por favor, digite alguns dados para gerar o QR code.',
        errorRequest: 'Erro ao gerar QR code. Por favor, tente novamente.'
    }
};

let currentLang = 'en';

function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const savedLang = localStorage.getItem('qrLang');
    
    if (savedLang) {
        return savedLang;
    }
    
    if (browserLang.toLowerCase().startsWith('pt')) {
        return 'pt';
    }
    
    return 'en';
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('qrLang', lang);
    
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'TITLE') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    const input = document.getElementById('dataInput');
    const placeholder = translations[lang].inputPlaceholder;
    input.setAttribute('placeholder', placeholder);
    
    document.title = translations[lang].title;
    
    const langToggle = document.getElementById('langToggle');
    langToggle.textContent = lang === 'en' ? 'PT' : 'EN';
}

function updateContent() {
    const lang = translations[currentLang];
    
    document.querySelectorAll('[data-en]').forEach(element => {
        const attr = `data-${currentLang}`;
        const text = element.getAttribute(attr);
        if (text) {
            element.textContent = text;
        }
    });
    
    const input = document.getElementById('dataInput');
    input.placeholder = lang.inputPlaceholder;
}

function generateQR() {
    const dataInput = document.getElementById('dataInput');
    const data = dataInput.value.trim();
    const errorMessage = document.getElementById('errorMessage');
    const qrResult = document.getElementById('qrResult');
    
    if (!data) {
        errorMessage.textContent = translations[currentLang].errorEmpty;
        errorMessage.style.display = 'block';
        qrResult.style.display = 'none';
        return;
    }
    
    errorMessage.style.display = 'none';
    
    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: data })
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            errorMessage.textContent = result.error;
            errorMessage.style.display = 'block';
            qrResult.style.display = 'none';
        } else {
            const qrImage = document.getElementById('qrImage');
            qrImage.src = result.image;
            qrResult.style.display = 'block';
            errorMessage.style.display = 'none';
        }
    })
    .catch(error => {
        errorMessage.textContent = translations[currentLang].errorRequest;
        errorMessage.style.display = 'block';
        qrResult.style.display = 'none';
    });
}

function downloadQR() {
    const qrImage = document.getElementById('qrImage');
    const imageSrc = qrImage.src;
    
    if (!imageSrc || imageSrc === '') {
        return;
    }
    
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', function() {
    currentLang = detectLanguage();
    setLanguage(currentLang);
    
    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', function() {
        const newLang = currentLang === 'en' ? 'pt' : 'en';
        setLanguage(newLang);
    });
    
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', generateQR);
    
    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', downloadQR);
    
    const dataInput = document.getElementById('dataInput');
    dataInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            generateQR();
        }
    });
});

