from sentence_transformers import SentenceTransformer


MODEL_NAME = "all-MiniLM-L6-v2"


print(f"Loading embedding model: {MODEL_NAME}...")

model = SentenceTransformer(MODEL_NAME)

print("Embedding model loaded successfully!")


def create_embeddings(texts: list[str]):
    """
    Convert text chunks into normalized numerical
    embedding vectors.
    """

    if not texts:
        return []

    cleaned_texts = [
        text.strip()
        for text in texts
        if isinstance(text, str) and text.strip()
    ]

    if not cleaned_texts:
        return []

    embeddings = model.encode(
        cleaned_texts,
        convert_to_numpy=True,
        normalize_embeddings=True,
        show_progress_bar=False,
    )

    return embeddings