from fastapi import FastAPI
from pydantic import BaseModel

from ai.emotion import detect_emotion
from ai.sentiment import detect_sentiment
from ai.intent import detect_intent
from ai.response import generate_response
from ai.prompt import build_mindmate_prompt
from ai.llm import generate_llm_response
from ai.safety import check_response_safety
from rag.rag_service import RAGService


app = FastAPI(
    title="MindMate AI Service",
    description="AI backend for MindMate",
    version="1.0.0",
)


# ---------------------------------------------------------
# RAG service
# ---------------------------------------------------------

rag_service = RAGService()


# ---------------------------------------------------------
# Request models
# ---------------------------------------------------------

class AnalyzeRequest(BaseModel):
    text: str


class ChatRequest(BaseModel):
    text: str


# ---------------------------------------------------------
# Basic routes
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "MindMate AI Service is running!",
        "status": "ok",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "MindMate AI",
        "version": "1.0.0",
    }


# ---------------------------------------------------------
# Text analysis
# ---------------------------------------------------------

@app.post("/analyze")
def analyze_text(request: AnalyzeRequest):
    text = request.text.strip()

    if not text:
        return {
            "error": "Text cannot be empty."
        }

    emotion = detect_emotion(text)
    sentiment = detect_sentiment(text)
    intent = detect_intent(text)

    response = generate_response(
        emotion=emotion["emotion"],
        sentiment=sentiment["sentiment"],
        intent=intent,
    )

    return {
        "text": text,
        "emotion": emotion,
        "sentiment": sentiment,
        "intent": intent,
        "response": response,
    }


# ---------------------------------------------------------
# AI Chat
# ---------------------------------------------------------

@app.post("/chat")
def chat(request: ChatRequest):
    text = request.text.strip()

    if not text:
        return {
            "error": "Text cannot be empty."
        }

    # 1. Analyze user message
    emotion = detect_emotion(text)
    sentiment = detect_sentiment(text)
    intent = detect_intent(text)

    # 2. Retrieve relevant MindMate knowledge
    context = rag_service.retrieve_context(
        text,
        top_k=3,
    )

    # 3. Build RAG-aware prompt
    prompt = build_mindmate_prompt(
        text=text,
        emotion=emotion["emotion"],
        sentiment=sentiment["sentiment"],
        intent=intent,
        context=context,
    )

    # 4. Generate LLM response
    ai_response = generate_llm_response(prompt)

    # 5. Safety check
    safety_result = check_response_safety(ai_response)

    # 6. Return final result
    return {
        "text": text,
        "emotion": emotion,
        "sentiment": sentiment,
        "intent": intent,
        "response": safety_result["response"],
        "safety": {
            "safe": safety_result["safe"],
        },
    }