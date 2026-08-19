from transformers import pipeline


print("Loading Emotion Transformer...")

emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

print("Emotion Transformer loaded successfully!")


def detect_emotion(text: str):
    results = emotion_classifier(text)[0]

    results = sorted(
        results,
        key=lambda x: x["score"],
        reverse=True
    )

    return {
        "emotion": results[0]["label"],
        "confidence": round(results[0]["score"], 4),
        "top_emotions": [
            {
                "emotion": item["label"],
                "confidence": round(item["score"], 4)
            }
            for item in results[:3]
        ]
    }