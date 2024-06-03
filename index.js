import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
let genAI;
const DEFAULT_MODEL_TYPE = 'gemini-1.5-flash';

//
// HELPER FUNCTIONS
//

/**
 * Set the GEMINI API key.
 */
export function setGeminiApiKey(apiKey) {
  if (!apiKey) {
    throw new Error('API key is required');
  }
  genAI = new GoogleGenerativeAI(apiKey);
}

/**
 * Load GEMINI API key from environment variables.
 */
export function setGeminiApiKeyFromEnv() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }
  setGeminiApiKey(apiKey);
}

/**
 * Set Gemini Model type.
 */
export function setGeminiModel(modelStringParam){
  DEFAULT_MODEL_TYPE = modelStringParam;
}

/**
 * Convert file to generative part.
 */
function fileToGenerativePart(path, mimeType) {
  const data = fs.readFileSync(path).toString('base64');
  return {
    inlineData: {
      data,
      mimeType,
    },
  };
}


//
// MAIN FUNCTIONS
//

/**
 * Ask GEMINI API with a prompt and optional images.
 */
export async function askGemini(prompt, images = []) {
  if (!genAI) {
    throw new Error('API key is not set. Use setGeminiApiKey() to set it.');
  }

  const model = genAI.getGenerativeModel({ model: DEFAULT_MODEL_TYPE });

  let input = [prompt];
  if (images.length) {
    input = input.concat(images.map(image => fileToGenerativePart(image.path, image.type)));
  }

  try {
    const result = await model.generateContent(input);
    return result.response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

/**
 * Ask GEMINI API with a prompt and history.
 */
export async function askGeminiWithHistory(prompt, history = []) {
  if (!genAI) {
    throw new Error('API key is not set. Use setGeminiApiKey() to set it.');
  }

  const model = genAI.getGenerativeModel({ model: DEFAULT_MODEL_TYPE });

  try {
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens,
      },
    });
    const result = await chat.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error in chat with history:', error);
    throw error;
  }
}