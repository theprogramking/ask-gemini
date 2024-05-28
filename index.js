const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

let genAI;

// FUNCTION TO SET API KEY
function setGeminiApiKey(apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

// HELPER FUNCTION
function fileToGenerativePart(path, mimeType) {
  const data = fs.readFileSync(path).toString('base64');
  return {
    inlineData: {
      data,
      mimeType,
    },
  };
}

// MAIN FUNCTION
async function askGemini(prompt, images = [], modelTypeParam = 'gemini-1.5-flash') {
  // THROW ERROR IF API KEY IS NOT SET
  if (!genAI) {
    throw new Error('API key is not set. Use setGeminiApiKey() to set it.');
  }

  const modelType = modelTypeParam;
  const model = genAI.getGenerativeModel({ model: modelType });

  let input = [prompt];
  if (images.length) {
    input = input.concat(images.map(image => fileToGenerativePart(image.path, image.type)));
  }

  const result = await model.generateContent(input);
  return result.response.text();
}

// FUNCTION TO HANDLE CHAT WITH HISTORY
async function askGeminiWithHistory(prompt, history = [], maxOutputTokens = 100) {
    // THROW ERROR IF API KEY IS NOT SET
    if (!genAI) {
      throw new Error('API key is not set. Use setGeminiApiKey() to set it.');
    }
  
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens,
      },
    });
  
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  }

// EXPORTS
module.exports = {
  setGeminiApiKey,
  askGemini,
  askGeminiWithHistory
};