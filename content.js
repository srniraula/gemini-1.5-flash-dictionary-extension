// content.js

let popover = null;
let currentSelection = null; // To store the last valid selection range

function createPopover() {
    popover = document.createElement('div');
    popover.id = 'gemini-meaning-popover';
    document.body.appendChild(popover);

    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;'; // HTML entity for multiplication sign (X)
    closeButton.title = 'Close';
    closeButton.onclick = hidePopover;
    popover.appendChild(closeButton);

    const contentDiv = document.createElement('p');
    contentDiv.id = 'gemini-meaning-content';
    popover.appendChild(contentDiv);
}

function showPopover(text, x, y) {
    if (!popover) {
        createPopover();
    }

    const contentDiv = popover.querySelector('#gemini-meaning-content');
    contentDiv.innerHTML = `<span class="loading-spinner"></span> Loading meaning for "${text}"...`;
    popover.style.left = `${x}px`;
    popover.style.top = `${y}px`;
    popover.style.display = 'block';

    // Force reflow for transition
    popover.offsetWidth;
    popover.style.opacity = '1';
}

function updatePopoverContent(meaning) {
    if (popover) {
        const contentDiv = popover.querySelector('#gemini-meaning-content');
        contentDiv.textContent = meaning;
    }
}

function hidePopover() {
    if (popover) {
        popover.style.opacity = '0';
        popover.addEventListener('transitionend', function handler() {
            if (popover) popover.style.display = 'none';
            popover.removeEventListener('transitionend', handler);
        }, { once: true });
    }
    currentSelection = null; // Clear selection on hide
}

// Listen for text selection
document.addEventListener('mouseup', function(event) {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // If there's a popover open and the click is inside it, don't hide it
    if (popover && popover.contains(event.target)) {
        return;
    }

    // Hide popover if no text is selected or if selected text is empty
    // and the click was outside the popover
    if (selectedText.length === 0) {
        hidePopover();
        return;
    }

    // Check if the selected text is just whitespace or too short/long
    if (selectedText.length < 2 || selectedText.length > 500) { // Adjust limits as needed
        hidePopover();
        return;
    }

    // Get the bounding rectangle of the selected text
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Calculate position for the popover (relative to viewport)
    // Adjust these values to position the popover above, below, or to the side
    const popoverX = window.scrollX + rect.left;
    const popoverY = window.scrollY + rect.bottom + 10; // 10px below selection

    showPopover(selectedText, popoverX, popoverY);
    currentSelection = selectedText; // Store for comparison

    // Send the selected text to the background script
    chrome.runtime.sendMessage({
        type: "getSelectedText",
        text: selectedText
    });
});


// Listen for meaning back from background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "displayMeaning") {
        // Only update if the meaning corresponds to the current selection
        // This prevents old meanings from showing up if user selects text quickly
        if (currentSelection && request.originalText === currentSelection) {
            updatePopoverContent(request.meaning);
        } else if (!currentSelection) { // If somehow selection was cleared but message still arrived
             updatePopoverContent(request.meaning); // Just show it
        }
    }
});

// Hide popover when scrolling to prevent it from floating disconnected
document.addEventListener('scroll', hidePopover);

// Hide popover when resizing window
window.addEventListener('resize', hidePopover);

// Hide popover when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hidePopover();
    }
});