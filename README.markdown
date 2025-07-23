# Meaning Popover Browser Extension

A lightweight Brave/Chrome browser extension that displays the meaning of selected text on any webpage using the **Google Gemini AI model**. Get instant definitions or explanations directly as a popover near your selection.

## Features

- **Contextual Meanings**: Definitions for selected words or phrases, right where you need them.
- **AI-Powered**: Uses **Google Gemini AI** for smart, relevant responses.
- **Seamless Experience**: Just select text—no clicks, no context switching.

## Setup & Installation

To run this extension, you’ll need your own **Google Gemini API key** and to follow these steps:

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **Get API key** in the left sidebar.
4. **Important Security Tip**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/).
   - Find your new API key.


### Step 2: Clone the Repository

1. Open a terminal and run:

   ```bash
   git clone https://github.com/srniraula/gemini-1.5-flash-dictionary-extension.git
   cd gemini-1.5-flash-dictionary-extension
   ```

### Step 3: Insert Your API Key

1. Open the `background.js` file in your cloned folder using a code editor (e.g., VS Code, Sublime, Notepad++).
2. Find the line:

   ```javascript
   const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
   ```

3. Replace `"YOUR_GEMINI_API_KEY_HERE"` with your actual Gemini API key (keep the quotes). Example:

   ```javascript
   const GEMINI_API_KEY = "AIzaSyC_YourActualKeyGoesHere_Example123";
   ```

4. Save the file.

### Step 4: Load the Extension in Your Browser

This extension is built for Chromium-based browsers like Brave and Google Chrome.

1. Open your browser and go to:
   - `brave://extensions` (for Brave)
   - `chrome://extensions` (for Chrome)
2. In the top right, toggle **Developer mode** to **ON**.
3. Click **Load unpacked**.
4. Select the root folder of your cloned repo (`YourRepoName`).
5. The **Meaning Popover** extension should now appear in your list of installed extensions.

### Step 5: How to Use

1. Open any webpage.
2. Select a word or sentence using your mouse.
3. After a short pause, a popover will appear near your selection displaying its meaning or explanation from Gemini AI.

But be mindful, the free tier has limitations on the rate of api calls per minutes.
