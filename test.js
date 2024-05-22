const { setGeminiApiKey, askGemini } = require('./index.js');

setGeminiApiKey('AIzaSyChOzOk5WJfkxHIbTJmjYzH-mSU4T8eW1E');

const images = [
    { path: 'jojo.jpg', type: 'image/jpg' },
    { path: 'weezer.png', type: 'image/png' },
  ];

// Call askGemini with prompt and images
askGemini("What is the similiarites between these two images?", images)
  .then(response => console.log(response))
  .catch(error => console.error(error));