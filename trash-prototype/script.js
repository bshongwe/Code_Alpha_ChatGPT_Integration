// #1. Retrieve chat history data from API
async function fetchChatHistory() {
    try {
        const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your actual OpenAI API key
        const response = await fetch('https://api.openai.com/v1/conversations', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch chat history data. Status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!data || !Array.isArray(data.data)) {
            throw new Error('Invalid response format: data is missing or not an array');
        }
        return data.data; // Assuming chat history data is in the 'data' property
    } catch (error) {
        console.error('Error fetching chat history:', error);
        return []; // Returns an empty array in case of error
    }
}

// #2. Populates dropdown menu with chat history options
async function populateChatDropdown() {
    const dropdownContent = document.getElementById("chatDropdownContent");
    dropdownContent.innerHTML = "";
    try {
        const chatHistory = await fetchChatHistory();
        chatHistory.forEach(chat => {
            const option = document.createElement("a");
            option.textContent = chat.id; // Assuming each chat has an 'id' property
            option.href = "#";
            dropdownContent.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating chat dropdown:', error.message);
    }
}

// #3. Calls function to populate the dropdown menu on page load
populateChatDropdown();

