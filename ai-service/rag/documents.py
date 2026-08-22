from pathlib import Path


KNOWLEDGE_BASE_DIR = Path(__file__).resolve().parent.parent / "knowledge_base"


def load_documents() -> list[str]:
    """
    Load all .txt documents from the knowledge base.
    """

    documents = []

    for file_path in KNOWLEDGE_BASE_DIR.glob("*.txt"):
        text = file_path.read_text(encoding="utf-8").strip()

        if text:
            documents.append(text)

    return documents


def chunk_text(
    text: str,
    chunk_size: int = 500,
    overlap: int = 100
) -> list[str]:
    """
    Split text into overlapping word-based chunks.
    """

    words = text.split()

    chunks = []

    start = 0

    while start < len(words):
        end = start + chunk_size

        chunk = " ".join(words[start:end])

        if chunk:
            chunks.append(chunk)

        if end >= len(words):
            break

        start = end - overlap

    return chunks


def load_and_chunk_documents() -> list[str]:
    """
    Load knowledge-base documents and split them into chunks.
    """

    documents = load_documents()

    all_chunks = []

    for document in documents:
        chunks = chunk_text(document)
        all_chunks.extend(chunks)

    return all_chunks