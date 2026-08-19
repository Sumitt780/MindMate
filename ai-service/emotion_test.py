from transformers import pipeline

print("Loading Emotion Transformer...")

emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

texts = [
    "I am feeling really stressed about my exam.",
    "Today was an amazing day!",
    "I feel lonely and sad.",
    "I am extremely angry right now."
]

for text in texts:
    results = emotion_classifier(text)[0]

    results = sorted(
        results,
        key=lambda x: x["score"],
        reverse=True
    )

    print("\nInput:", text)
    print("Top emotions:")

    for emotion in results[:3]:
        print(
            f"  {emotion['label']}: "
            f"{emotion['score']:.4f}"
        )