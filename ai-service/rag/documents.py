from pathlib import Path


KNOWLEDGE_BASE_DIR = (
    Path(__file__).resolve().parent.parent / "knowledge_base"
)


def load_documents() -> list[str]:
    """
    Load all non-empty .txt documents from the knowledge base.
    """

    documents = []

    if not KNOWLEDGE_BASE_DIR.exists():
        return documents

    for file_path in sorted(KNOWLEDGE_BASE_DIR.glob("*.txt")):
        try:
            text = file_path.read_text(encoding="utf-8").strip()
        except OSError as exc:
            print(f"Could not read {file_path.name}: {exc}")
            continue

        if text:
            documents.append(text)

    return documents


def chunk_text(
    text: str,
    chunk_size: int = 120,
    overlap: int = 30,
) -> list[str]:
    """
    Split text into overlapping word-based chunks.
    """

    if not text or chunk_size <= 0:
        return []

    if overlap < 0:
        overlap = 0

    if overlap >= chunk_size:
        overlap = chunk_size // 4

    words = text.split()
    chunks = []

    start = 0

    while start < len(words):
        end = start + chunk_size

        chunk = " ".join(words[start:end]).strip()

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
        all_chunks.extend(chunk_text(document))

    return all_chunks