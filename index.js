const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
let genAI;

// FUNCTION TO SET API KEY
function setGeminiApiKey(apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

// HELPER FUNCTION
function fileToGenerativePart(path, mimeType) {
  return {
      inlineData: {
          data: Buffer.from(fs.readFileSync(path)).toString("base64"),
          mimeType
      },
  };
}

// MAIN
async function askGemini(prompt, images, modelTypeParam) {

  // DETERMINE MODEL TYPE
  const modelType = 'gemini-1.5-flash';
  if (modelTypeParam) {
      modelType = modelTypeParam;
  }

  // THROW ERROR IF THEY DID NOT SET API KEY
  if (!genAI) {
      throw new Error('API key is not set. Use setGeminiApiKey() to set it.');
  }

  // IF MODEL TYPE IS TEXT BASED
  if (!images) {
      const model = genAI.getGenerativeModel({
          model: modelType
      });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      return text;
  }

  // IF MODEL TYPE IS IMAGE AND TEXT BASED
  if (images) {
      let imageParts = [];
      images.forEach((image) => {
          imageParts.push(fileToGenerativePart(image.path, image.type));
      });
      const model = genAI.getGenerativeModel({
          model: modelType
      });
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = result.response;
      const text = response.text();
      return text;
  }
}

// EXPORTS
module.exports = {
  setGeminiApiKey,
  askGemini
};