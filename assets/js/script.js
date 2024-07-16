const inputText = document.getElementById('input-text');
const outputContent = document.getElementById('output-content');
const result = document.getElementById('result');
const resultText = document.getElementById('result-text');
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const copyBtn = document.getElementById('copy-btn');
const charCount = document.getElementById('char-count');

const encryptionRules = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

function updateCharCount() {
    charCount.textContent = `${inputText.value.length} caracteres`;
}

function isValidInput(text) {
    return /^[a-z\s]*$/.test(text);
}

function encrypt(text) {
    return text.replace(/[aeiou]/g, char => encryptionRules[char]);
}

function decrypt(text) {
    return text.replace(/enter|imes|ai|ober|ufat/g, match =>
        Object.keys(encryptionRules).find(key => encryptionRules[key] === match)
    );
}

function showResult(text) {
    resultText.textContent = text;
    outputContent.classList.add('hidden');
    result.classList.remove('hidden');
}

function processText(action) {
    const text = inputText.value.trim();
    if (!text) {
        alert('Por favor, ingrese algún texto.');
        return;
    }
    if (!isValidInput(text)) {
        alert('Por favor, use solo letras minúsculas y sin acentos.');
        return;
    }
    const processedText = action === 'encrypt' ? encrypt(text) : decrypt(text);
    showResult(processedText);
}

encryptBtn.addEventListener('click', () => processText('encrypt'));
decryptBtn.addEventListener('click', () => processText('decrypt'));

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(resultText.textContent).then(() => {
        copyBtn.textContent = '¡Copiado!';
        setTimeout(() => {
            copyBtn.textContent = 'Copiar';
        }, 2000);
    });
});

inputText.addEventListener('input', () => {
    updateCharCount();
    if (inputText.value.trim() === '') {
        outputContent.classList.remove('hidden');
        result.classList.add('hidden');
    }
});

updateCharCount();