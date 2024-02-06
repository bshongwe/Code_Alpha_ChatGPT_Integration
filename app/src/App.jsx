import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

function App() {

 return (
 <>
   {/* A container for the chat window */}
   <div style={{ position: "relative", height: "100vh", width: "700px" }}>
     {/* All components are wrapped in the MainContainer */}
     <MainContainer>
       {/* All chat logic will be contained in the ChatContainer */}
       <ChatContainer>
         {/* Shows all our messages */}
         <MessageList></MessageList>
       </ChatContainer>
     </MainContainer>
   </div>
 </>
 );
}

//#1. State to store chat messages
const [chatMessages, setChatMessages] = useState([
 {
   message: "Hello, I am ChatGPT!",
   sender: "ChatGPT",
 },
]);

export default App
