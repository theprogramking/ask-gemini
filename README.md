# ask-gemini

A simple npm package to easily interact with Google's Generative AI (Gemini) in a Node.js project.

## Installation

To install the package, use npm:

```sh
npm install ask-gemini
```

## Usage

First, you need to import the package and set your API key. Then you can use the `askGemini` function to get responses from the AI.

```javascript
const { setGeminiApiKey, askGemini } = require('ask-gemini');

// Set your API key
setGeminiApiKey('YOUR_GOOGLE_API_KEY');

// Ask Gemini AI something
askGemini('Generate a paragraph about the history of the United States.').then(response => {
  console.log(response);
}).catch(err => {
  console.error(err);
});
```
### Functions

#### setGeminiApiKey(apiKey required)

Sets the API key for the Google Generative AI service.

- **Parameters:**
  - `apiKey` (string): Your Google Generative AI API key.

#### askGemini(prompt required, imageArray optional)

Sends a prompt to the AI and returns the response.

- **Parameters:**
  - `prompt` (string): The text prompt to send to the AI.
  - `imageArray` (Array): An array of objects with image file path and type.

- **Returns:**
  - A promise that resolves to the AI's response.

### Passing images to Gemini 
Below is an example if you wanted to add images to your prompt:
```javascript
const { setGeminiApiKey, askGemini } = require('ask-gemini');

setGeminiApiKey('YOUR_GOOGLE_API_KEY');

// Ask Gemini AI with prompt and images
askGemini("What is the differences between these two images?", [
  { path: 'image1.jpg', type: 'image/jpg' },
  { path: 'image2.png', type: 'image/png' },
])
  .then(response => console.log(response))
  .catch(error => console.error(error));
```


## License

This package is licensed under the ISC License. See the LICENSE file for details.