# websocket.py

from fastapi import WebSocket
import openai  # Import the OpenAI API library

# Set your OpenAI API key (replace with your actual key)
openai.api_key = "OpenAI-API Key"

async def websocket_handler(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()

        # Process user input
        user_message = data

        # Send to ChatGPT
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",  # Use the desired model
                prompt=user_message,
                max_tokens=150,  # Adjust response length as needed
                stop=None,
                temperature=0.7,
            )
            chatgpt_response = response.choices[0].text.strip()
        except Exception as e:
            chatgpt_response = f"Error: {str(e)}"

        # Send response back to the client
        await websocket.send_text(chatgpt_response)
