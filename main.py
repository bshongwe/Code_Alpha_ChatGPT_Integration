from fastapi import FastAPI, WebSocket
import openai  # Import the OpenAI API library

app = FastAPI()

# Set your OpenAI API key (replace with your actual key)
openai.api_key = "OpenAI-api"

# WebSocket route
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
