from transformers import pipeline

print("Loading Transformer model...")

classifier = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

text = "I am feeling really stressed about my exam."

result = classifier(text)

print("\nInput:", text)
print("Result:", result)