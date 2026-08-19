from transformers import pipeline


print("Loading Sentiment Transformer...")

sentiment_classifier = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

print("Sentiment Transformer loaded successfully!")


def detect_sentiment(text: str):
    result = sentiment_classifier(text)[0]

    return {
        "sentiment": result["label"].lower(),
        "confidence": round(result["score"], 4)
    }