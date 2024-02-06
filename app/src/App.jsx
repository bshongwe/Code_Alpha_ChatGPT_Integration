import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

function App() {
  // #1. State to store chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hello, I am ChatGPT!",
      sender: "ChatGPT",
    },
  ]);

  // #2. Handler for sending user messages
  const handleUserMessage = async (userMessage) => {
    //<MessageInput placeholder='Type Message here' onSend={handleUserMessage}/>
	// #2.1 Create a new user message object
	const newUserMessage = {
		message: userMessage,
		sender: "user",
		direction: "outgoing",
	};

 	// #2.2 Update chat messages state with the new user message
 	const updatedChatMessages = [...chatMessages, newUserMessage];
	  setChatMessages(updatedChatMessages);
  };

  return (
    <>
      {/* A container for the chat window */}
      <div style={{ position: "relative", height: "100vh", width: "700px" }}>
        {/* All components are wrapped in the MainContainer */}
        <MainContainer>
          {/* All chat logic will be contained in the ChatContainer */}
          <ChatContainer>
            {/* Shows all our messages */}
            <MessageList>
              {/* Map through chat messages and render each message */}
              {chatMessages.map((message, i) => (
                <Message
                  key={i}
                  model={message}
                  style={
                    message.sender === "ChatGPT" ? { textAlign: "left" } : {}
                  }
                />
              ))}
            </MessageList>
            {/* User Input Handler */}
            <MessageInput
              placeholder="Type Message here"
              onSend={handleUserMessage}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

export default App;

