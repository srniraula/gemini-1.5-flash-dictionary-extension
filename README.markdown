# Meaning Popover Browser Extension

A lightweight Brave/Chrome browser extension that displays the meaning of selected text on any webpage using the **Google Gemini-2.5 Flash-Lite model**. Get instant definitions or explanations directly as a popover near your selection.

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
   git clone https://github.com/srniraula/gemini-2.5-flash-lite-dictionary-extension.git
   cd gemini-2.5-flash-lite-dictionary-extension
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

But be mindful, the free tier has limitations on the rate of api calls. You get 15 Requests Per Minute (RPM) and 1000 Requests Per Day (RPD) with Tokens Per Minute (TPM) of 250000.

## Demo
### Before
<img width="1000" height="187" alt="image" src="https://github.com/user-attachments/assets/191af2c0-56c7-428c-b1e6-d26f95e78f17" />

### After
<img width="859" height="234" alt="image" src="https://github.com/user-attachments/assets/c3eecf6f-123f-4a47-9fcc-7eaf132630ff" />


