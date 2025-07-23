// background.js

// IMPORTANT: Replace with your actual Gemini API Key
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "getSelectedText") {
    const selectedText = request.text;
    console.log("Selected text received in background:", selectedText);

    // Call Gemini API to get the meaning
    fetchMeaning(selectedText)
      .then(meaning => {
        console.log("Meaning fetched:", meaning);
        // Send the meaning back to the content.js,
        // and include the original text to match with current selection
        chrome.tabs.sendMessage(sender.tab.id, {
          type: "displayMeaning",
          meaning: meaning,
          originalText: selectedText // Crucial for matching
        });
      })
      .catch(error => {
        console.error("Error fetching meaning:", error);
        chrome.tabs.sendMessage(sender.tab.id, {
          type: "displayMeaning",
          meaning: "Error: Could not get meaning. " + error.message,
          originalText: selectedText // Crucial for matching
        });
      });
  }
  return true; // Indicates that the response will be sent asynchronously
});


async function fetchMeaning(text) {
  const model = "gemini-1.5-flash"; // Use gemini-1.5-flash for general purpose, or gemini-1.5-pro for higher quality // Or "gemini-1.5-flash", "gemini-1.5-pro"
  const prompt = `Provide a concise meaning or definition for the following text. If it's a common phrase, explain its general usage. Do not include introductory phrases like "The meaning of..." or "This means...". Just the meaning.

Text: "${text}"

Meaning:`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${response.status} - ${errorData.error.message}`);
    }

    const data = await response.json();
    // Safely access the generated text
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text;
    } else {
        return "No meaning found or unexpected API response.";
    }
  } catch (error) {
    console.error("Error in fetchMeaning:", error);
    return `Failed to fetch meaning: ${error.message}`;
  }
}