// #1. Function to retrieve chat history from local storage
function getChatHistory() {
    // #1.1 Retrieve chat history from local storage or initialize as an empty array if not present
    return JSON.parse(localStorage.getItem('chatHistory')) || [];
}

// #2. Saves chat history to local storage
function saveChatHistory(history) {
    // #2.1 Saves chat history to local storage
    localStorage.setItem('chatHistory', JSON.stringify(history));
}

// #3. Populates the dropdown menu with chat history options
function populateChatDropdown() {
    const dropdownContent = document.getElementById("chatDropdownContent");
    // #3.1 Clears existing options
    dropdownContent.innerHTML = "";
    // #3.2 Retrieves chat history from local storage
    const chatHistory = getChatHistory();
    // #3.3 Populates dropdown with chat history options
    chatHistory.forEach(chat => {
        const option = document.createElement("a");
        option.textContent = chat;
        option.href = "#";
        dropdownContent.appendChild(option);
    });
}

// #4. Adds a new chat to the chat history
function addChatToHistory(chat) {
    // #4.1 Retrieves existing chat history from local storage
    let chatHistory = getChatHistory();
    // #4.2 Adds the new chat to the chat history
    chatHistory.push(chat);
    // #4.3 Saves the updated chat history to local storage
    saveChatHistory(chatHistory);
}

// #5. Calls function to populate the dropdown menu on page load
populateChatDropdown();
