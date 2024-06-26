![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

# ask-gemini

A simple npm package to easily interact with Google's Generative AI (Gemini) in a Node.js project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Using Images](#using-images)
  - [Using Multi-Turn Conversations](#using-multi-turn-conversations)
- [Documentation](#documentation)
- [License](#license)

## Installation

To install the package, use npm:

```sh
npm install ask-gemini
```

## Usage

First, you need to import the package and set your API key. Then you can use the `askGemini` function to get responses from the AI. Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to get your API key. 

```javascript
import { setGeminiApiKey, askGemini } from 'ask-gemini';

// Set your API key
setGeminiApiKey('YOUR_GOOGLE_API_KEY');

// Ask Gemini AI something
askGemini('Generate a paragraph about the history of the United States.')
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
```

## Using Images 
Below is an example if you wanted to add images/video/audio to your prompt:
```javascript
import { setGeminiApiKey, askGemini } from 'ask-gemini';

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
import { setGeminiApiKey, askGeminiWithHistory } from 'ask-gemini';

// Set the API key
setGeminiApiKey('YOUR_GOOGLE_API_KEY');

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
# Documentation

### setGeminiApiKey(apiKey)

Sets the API key for the Google Generative AI service.

- **Parameters:**
  - `apiKey` (string _required_): Your Google Generative AI API key.
___
### setGeminiApiKeyFromEnv()

Sets the API key for the Google Generative AI service from `process.env.GEMINI_API_KEY` variable.
___
### askGemini(prompt, imageArray)

Sends a prompt to the AI and returns the response.

- **Parameters:**
  - `prompt` (string _required_): The text prompt to send to the AI.
  - `imageArray` (Array _optional_): An array of objects with image file path and type.

- **Returns:**
  - A promise that resolves to the AI's response.
___
### askGeminiWithHistory(prompt, historyArray)

Sends a prompt to the AI and returns the response.

- **Parameters:**
  - `prompt` (string, _required_):  This is the new message you want to send to the AI. It should be a string containing your question or statement.
  - `history` (Array, _optional_): An array of previous messages in the conversation. Each entry in the array should be an object with a role and parts array. The role indicates whether the message was sent by the "user" or the "model", and parts is an array where each element has a text property containing the message text.

- **Returns:**
  - A promise that resolves to the AI's response.
___
### setGeminiModel(modelStringParam)

This function allows the user to set the default model type for Gemini. By calling this function and passing a `modelStringParam`, the user can specify which model type should be set as the default for Gemini.

- **Parameters:**
  - `modelStringParam` (string, _required_): A string parameter representing the model type that the user wants to set as the default for Gemini.

## License

This package is licensed under the ISC License. See the LICENSE file for details.