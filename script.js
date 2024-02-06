// #1. Retrieve chat history data from API
async function fetchChatHistory() {
    try {
        // #1.1 Request to fetch chat history data from API
        const response = await fetch('https://chat.openai.com/chat-history');
        if (!response.ok) {
            throw new Error('Failed to fetch chat history data');
        }
        // #1.2 Parse JSON response
        const data = await response.json();
        return data; // #1.2.1 Return chat history data
    } catch (error) {
        console.error('Error fetching chat history:', error);
        return []; // #1.2.2 Returns empty array in case of error
    }
}

// #2. Populates dropdown menu with chat history options
async function populateChatDropdown() {
    const dropdownContent = document.getElementById("chatDropdownContent");
    // #2.1 Clear existing options
    dropdownContent.innerHTML = "";
    try {
        // #2.1.1 Fetch chat history data
        const chatHistory = await fetchChatHistory();
        // #2.1.2 Populates dropdown with chat history options
        chatHistory.forEach(chat => {
            const option = document.createElement("a");
            option.textContent = chat;
            option.href = "#";
            dropdownContent.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating chat dropdown:', error);
    }
}

// #3. Calls function to populate the dropdown menu on page load
populateChatDropdown();
