// app.js

import { initializeWebSocket, sendMessage } from './websocket.js';

// Call function to initialize WebSocket connection on page load
initializeWebSocket();

// Example usage of sendMessage function
sendMessage("Hello, WebSocket ChatGPT!");
