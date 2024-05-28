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

#### setGeminiApiKey(apiKey _required_)

Sets the API key for the Google Generative AI service.

- **Parameters:**
  - `apiKey` (string): Your Google Generative AI API key.

#### askGemini(prompt, imageArray, modelVersion)

Sends a prompt to the AI and returns the response.

- **Parameters:**
  - `prompt` (string): The text prompt to send to the AI.
  - `imageArray` (Array): An array of objects with image file path and type.
  - `modelVersion` (string): Selects which version to use.

- **Returns:**
  - A promise that resolves to the AI's response.

## Using Images 
Below is an example if you wanted to add images/video/audio to your prompt:
```javascript
const { setGeminiApiKey, askGemini } = require('ask-gemini');

setGeminiApiKey('YOUR_GOOGLE_API_KEY');

// Ask Gemini AI with prompt and video/audio
askGemini("Can you summarize what is in this audio and what is in this picture?", [
  { path: 'video.mp3', type: 'audio/mp3' },
  { path: 'image.jpg', type: 'image/jpg' },
])
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

## Using Multi-Turn conversations

The `askGeminiWithHistory` function prompts the Gemini AI model with a message and a history of previous interactions, enabling multi-turn conversations.

```javascript
const { setGeminiApiKey, askGeminiWithHistory } = require('ask-gemini');

// Set the API key
setGeminiApiKey('YOUR_API_KEY');

// Define the conversation history
const history = [
  {
    role: 'user',
    parts: [{ text: 'Hello, I have 2 dogs in my house.' }],
  },
  {
    role: 'model',
    parts: [{ text: 'Great to meet you. What would you like to know?' }],
  },
];

// Send a follow-up message and get the response
askGeminiWithHistory('How many paws are in my house?', history)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

#### askGeminiWithHistory(prompt, historyArray, outputTokens)

Sends a prompt to the AI and returns the response.

- **Parameters:**
  - `prompt` (string, _required_):  This is the new message you want to send to the AI. It should be a string containing your question or statement.
  - `history` (Array, _optional_): An array of previous messages in the conversation. Each entry in the array should be an object with a role and parts array. The role indicates whether the message was sent by the "user" or the "model", and parts is an array where each element has a text property containing the message text.
  - `outputTokens` (int, _optional_): Optional parameter controls the maximum length of the AI's response in tokens. By default, it is set to 100 tokens.

- **Returns:**
  - A promise that resolves to the AI's response.

## License

This package is licensed under the ISC License. See the LICENSE file for details.
