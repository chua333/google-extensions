const API_KEY = "replace-with-your-api-key-here";
const API_URL = "https://translation.googleapis.com/language/translate/v2";

// Function to get the Japanese translation
async function getTranslation(word) {
  const response = await fetch(`${API_URL}?q=${encodeURIComponent(word)}&target=ja&key=${API_KEY}`, {
    method: 'POST',
  });
  
  const data = await response.json();
  return data.data.translations[0].translatedText;
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getTranslation") {
    getTranslation(request.word)
      .then(translation => {
        sendResponse({ translation });
      })
      .catch(error => {
        console.error("Translation error:", error);
        sendResponse({ translation: "Translation error" });
      });
    return true; // Asynchronous response
  }
});
