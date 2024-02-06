let socket;

export function initializeWebSocket() {
    try {
        // Create WebSocket connection
        socket = new WebSocket("ws://localhost:8000/ws");

        // Connection opened event
        socket.onopen = () => {
            console.log("WebSocket connection established.");
        };

        // Message received event
        socket.onmessage = (event) => {
            const response = event.data;
            // Handle received message as needed
        };

        // Error event
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        // Connection closed event
        socket.onclose = () => {
            console.log("WebSocket connection closed.");
            // Attempt to reconnect
            setTimeout(initializeWebSocket, 1000); // Retry connection after 1 second
        };
    } catch (error) {
        console.error("Failed to initialize WebSocket:", error);
    }
}

export function sendMessage(message) {
    try {
        socket.send(message);
    } catch (error) {
        console.error("Error sending message via WebSocket:", error);
    }
}
