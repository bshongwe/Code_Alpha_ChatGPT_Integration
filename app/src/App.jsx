import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
 MainContainer,
 ChatContainer,
 MessageList,
 Message,
 MessageInput,
 TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

// Var
// const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_KEY = 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;

function App() {
 // #1. State to manage the typing indicator of the chatbot
 const [isChatbotTyping, setIsChatbotTyping] = useState(false);

 // #2. State to store chat messages
 const [chatMessages, setChatMessages] = useState([
   {
     message: "Hello, I am ChatGPT!",
     sender: "ChatGPT",
   },
 ]);

 // #3. Function to handle user messages
 const handleUserMessage = async (userMessage) => {
   // #3.1 Create a new user message object
   const newUserMessage = {
     message: userMessage,
     sender: "user",
     direction: "outgoing",
   };

   // #3.2 Update chat messages state with the new user message
   const updatedChatMessages = [...chatMessages, newUserMessage];
   setChatMessages(updatedChatMessages);

   // #3.3 Set the typing indicator for the chatbot
   setIsChatbotTyping(true);

   // #3.4 Process user message with ChatGPT
   await processUserMessageToChatGPT(updatedChatMessages);
 };

 // #4. Function to send the user message to ChatGPT API
 async function processUserMessageToChatGPT(messages) {
   // #4.1 Prepare the messages in the required format for the API
   let apiMessages = messages.map((messageObject) => {
     let role = "";
     if (messageObject.sender === "ChatGPT") {
       role = "assistant";
     } else {
       role = "user";
     }
     return { role: role, content: messageObject.message };
   });

   // #4.2 System message for ChatGPT
   const systemMessage = {
     role: "system",
     content: "Explain all concepts like a Professor in Biochemistry",
   };

   // #4.3 Prepare the API request body
   const apiRequestBody = {
     model: "gpt-3.5-turbo",
     messages: [
       systemMessage, // #N.B.: System message should be in front of user messages
       ...apiMessages,
     ],
   };

   // #4.4 Send the user message to ChatGPT API
   await fetch("https://api.openai.com/v1/chat/completions", {
     method: "POST",
     headers: {
       Authorization: "Bearer " + OPENAI_API_KEY,
       "Content-Type": "application/json",
     },
     body: JSON.stringify(apiRequestBody),
   })
     .then((data) => {
       return data.json();
     })
     .then((data) => {
       // #4.5 Update chat messages with ChatGPT's response
       setChatMessages([
         ...messages,
         {
           message: data.choices[0].message.content,
           sender: "ChatGPT",
         },
       ]);
       // #4.6 Set the typing indicator to false after getting the response
       setIsChatbotTyping(false);
     });
 }

 return (
   <>
     {/* A container for the chat window */}
     <div style={{ position: "relative", height: "100vh", width: "700px" }}>
       <MainContainer>
         <ChatContainer>
           {/* Display chat messages and typing indicator */}
           <MessageList
             typingIndicator={
               isChatbotTyping ? (
                 <TypingIndicator content="ChatGPT is thinking" />
               ) : null
             }
           >
             {/* Map through chat messages and render each message */}
             {chatMessages.map((message, i) => {
               return (
                 <Message
                   key={i}
                   model={message}
                   style={
                     message.sender === "ChatGPT" ? { textAlign: "left" } : {}
                   }
                 />
               );
             })}
           </MessageList>
           {/* Input field for the user to type messages */}
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
