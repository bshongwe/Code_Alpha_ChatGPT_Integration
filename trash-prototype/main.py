# main.py

from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import openai
import httpx

app = FastAPI()

# Set your OpenAI API key (replace with your actual key)
openai.api_key = "OpenAI-api"

# Configure CORS to allow requests from your frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],  # Adjust this to your frontend origin
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

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
                engine="text-davinci-003",
                prompt=user_message,
                max_tokens=150,
                stop=None,
                temperature=0.7,
            )
            chatgpt_response = response.choices[0].text.strip()
        except Exception as e:
            chatgpt_response = f"Error: {str(e)}"

        # Send response back to the client
        await websocket.send_text(chatgpt_response)

# Endpoint to fetch chat history from OpenAI API
@app.get("/chat-history")
async def fetch_chat_history():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.openai.com/v1/conversations",
                headers={"Authorization": f"Bearer {openai.api_key}"}
            )
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

