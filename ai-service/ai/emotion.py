from transformers import pipeline


MODEL_NAME = "j-hartmann/emotion-english-distilroberta-base"


print("Loading Emotion Transformer...")


emotion_classifier = pipeline(
    task="text-classification",
    model=MODEL_NAME,
    top_k=None,
)


print("Emotion Transformer loaded successfully!")


def detect_emotion(text: str):
    """
    Detect the main emotion and return the top 3 emotions
    with confidence scores.
    """

    text = (text or "").strip()

    if not text:
        return {
            "emotion": "neutral",
            "confidence": 0.0,
            "top_emotions": [],
        }

    results = emotion_classifier(text)

    # Transformers can return nested results for top_k=None.
    if results and isinstance(results[0], list):
        results = results[0]

    results = sorted(
        results,
        key=lambda item: item.get("score", 0.0),
        reverse=True,
    )

    if not results:
        return {
            "emotion": "neutral",
            "confidence": 0.0,
            "top_emotions": [],
        }

    return {
        "emotion": results[0]["label"],
        "confidence": round(results[0]["score"], 4),
        "top_emotions": [
            {
                "emotion": item["label"],
                "confidence": round(item["score"], 4),
            }
            for item in results[:3]
        ],
    }