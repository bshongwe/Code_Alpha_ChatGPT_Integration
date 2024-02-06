// #1. Simulated chat history data (to replace this with actual chat history data)
const chatHistory = [
	"Chat 1",
	"Chat 2",
	"Chat 3",
	"chat 4",
	"chat 5"
	// to try and automate if possible
];

// #2. Populate the dropdown menu with chat history options
function populateChatDropdown() {
	const dropdownContent = document.getElementById("chatDropdownContent");
	// Clear existing options
	dropdownContent.innerHTML = "";
	// Populate dropdown with chat history options
	chatHistory.forEach(chat => {
		const option = document.createElement("a");
		option.textContent = chat;
		option.href = "#";
		dropdownContent.appendChild(option);
	});
}

// #3. Calls function to populate the dropdown menu on page load
populateChatDropdown();
