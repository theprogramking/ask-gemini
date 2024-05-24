const { setGeminiApiKey, askGemini } = require('./index.js');

// Set your API key
setGeminiApiKey('AIzaSyBch93LXfQoEA5XKa6mFISM_MmREbPB328');

// Ask Gemini AI something
askGemini('Generate a paragraph about the history of the United States.').then(response => {
  console.log(response);
}).catch(err => {
  console.error(err);
});