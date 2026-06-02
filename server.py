import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

app = FastAPI()

# This lets your public GitHub Pages website talk to this private Render server safely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Render will securely pull your key from the Environment Variable we just set up!
GOOGLE_API_KEY = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    try:
    # Using the fast and powerful Gemini 1.5 Flash model
    model = genai.GenerativeModel('gemini-pro')

    # Guardrail system instructions so the AI behaves like an expert for your business
    system_instruction = (
        
            "You are Dhandai-AI, the expert virtual assistant for Dhandai Agro Service located in Arvi and Borkund. "
            "Your job is to answer the user's question accurately, politely, and professionally. "
            "You have complete knowledge of all farming crops (like Cotton, Soybean, Maize, Sugarcane, etc.), "
            "fertilizers, weather conditions, and pest controls. "
            "Always reply in the exact same language or script the user uses (English, Marathi, Hindi, or Hinglish)."
        )
        
        # Send the instruction along with the user's real question to Gemini
        response = model.generate_content(f"{system_instruction}\n\nUser Question: {request.message}")
        return {"reply": response.text}
        
    except Exception as e:
        return {"reply": f"System error processing neural nodes: {str(e)}"}
      
