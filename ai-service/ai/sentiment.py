from transformers import pipeline


MODEL_NAME = "distilbert-base-uncased-finetuned-sst-2-english"


print("Loading Sentiment Transformer...")


sentiment_classifier = pipeline(
    task="sentiment-analysis",
    model=MODEL_NAME,
)


print("Sentiment Transformer loaded successfully!")


def detect_sentiment(text: str):
    """
    Detect sentiment and return the label
    with its confidence score.
    """

    text = (text or "").strip()

    if not text:
        return {
            "sentiment": "neutral",
            "confidence": 0.0,
        }

    result = sentiment_classifier(text)[0]

    return {
        "sentiment": result["label"].lower(),
        "confidence": round(result["score"], 4),
    }