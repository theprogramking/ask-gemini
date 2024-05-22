# ask-gemini

A simple npm package to easily interact with Google's Generative AI (Gemini) in a Node.js project.

## Installation

To install the package, use npm:

```sh
npm install ask-gemini
```

## Usage

First, you need to import the package and set your API key. Then you can use the askAI function to get responses from the AI.

```javascript
const { setGeminiApiKey, askGemini } = require('ask-gemini');

// Set your API key
setGeminiApiKey('YOUR_GOOGLE_API_KEY');

// Ask AI something
askGemini('Generate a paragraph about the history of the United States.').then(response => {
  console.log(response);
}).catch(err => {
  console.error(err);
});
```
### Functions

#### setGeminiApiKey(apiKey)

Sets the API key for the Google Generative AI service.

- **Parameters:**
  - `apiKey` (string): Your Google Generative AI API key.

#### askGemini(prompt)

Sends a prompt to the AI and returns the response.

- **Parameters:**
  - `prompt` (string): The text prompt to send to the AI.

- **Returns:**
  - A promise that resolves to the AI's response.

## License

This package is licensed under the ISC License. See the LICENSE file for details.