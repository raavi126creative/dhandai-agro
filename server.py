import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

# Fetch the raw key directly from your saved environment configuration
GOOGLE_API_KEY = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

app = FastAPI()

# Enable cross-origin resource sharing so your GitHub Frontend can talk to Render securely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        system_instruction = "You are Dhandai-AI, the expert virtual assistant for Dhandai Agro Service located in Arvi and Borkund. Your job is to answer the user's question accurately, politely, and professionally. You have complete knowledge of all farming crops (like Cotton, Soybean, Maize, Sugarcane, etc.), fertilizers, weather conditions, and pest controls."
        
        prompt = f"{system_instruction}\n\nUser Question: {request.message}\nAI Answer:"
        
        response = model.generate_content(prompt)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "Dhandai Agro Backend Server is running perfectly"}
    
