from fastapi import FastAPI
from pydantic import BaseModel

from ai.emotion import detect_emotion
from ai.sentiment import detect_sentiment
from ai.intent import detect_intent
from ai.response import generate_response

app = FastAPI(
    title="MindMate AI Service",
    description="AI backend for MindMate",
    version="1.0.0"
)


class AnalyzeRequest(BaseModel):
    text: str


@app.get("/")
def root():
    return {
        "message": "MindMate AI Service is running!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "MindMate AI",
        "version": "1.0.0"
    }


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
        intent=intent
    )

    return {
        "text": text,
        "emotion": emotion,
        "sentiment": sentiment,
        "intent": intent,
        "response": response
    }