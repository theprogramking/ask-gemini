const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;

function setApiKey(apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

async function askAI(prompt) {
  if (!genAI) {
    throw new Error('API key is not set. Use setApiKey() to set it.');
  }

  if (prompt) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } else {
    console.log('You must enter a prompt when calling this function');
  }
}

module.exports = { setApiKey, askAI };