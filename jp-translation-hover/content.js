// Create a tooltip element
const tooltip = document.createElement('div');
tooltip.id = 'word-tooltip';
document.body.appendChild(tooltip);

// Function to show the tooltip with the original and translated word
function showTooltip(word, translation, event) {
  tooltip.innerHTML = `<strong>${word}</strong><br><span>${translation}</span>`;
  tooltip.style.display = 'block'; // Make the tooltip visible
  tooltip.style.top = `${event.clientY + 10}px`; // Position below the cursor
  tooltip.style.left = `${event.clientX + 10}px`; // Position to the right of the cursor
}

// Function to hide the tooltip
function hideTooltip() {
  tooltip.style.display = 'none'; // Hide the tooltip
}

// Function to handle mouse hover over text
document.addEventListener('mousemove', function (event) {
  const range = document.caretRangeFromPoint(event.clientX, event.clientY);
  const textNode = range && range.startContainer;

  if (textNode && textNode.nodeType === Node.TEXT_NODE) {
    const word = getHoveredWord(textNode, range.startOffset);
    if (word) {
      // Send the word to the background script for translation
      chrome.runtime.sendMessage(
        { type: "getTranslation", word: word },
        function (response) {
          const translation = response.translation || "Translation not available";
          showTooltip(word, translation, event);
        }
      );
    }
  }
});

// Helper function to get the word under the cursor
function getHoveredWord(node, offset) {
  const text = node.textContent;
  const words = text.split(/\s+/); // Split by spaces
  let start = 0;

  // Iterate through the words to find the one at the offset
  for (let word of words) {
    const wordLength = word.length + 1; // Account for the space after each word
    if (offset >= start && offset < start + wordLength) {
      return word;
    }
    start += wordLength;
  }

  return null; // Return null if no word found
}

// Hide tooltip when mouse leaves the document
document.addEventListener('mouseleave', hideTooltip);
