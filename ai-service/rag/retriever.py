from rag.embeddings import create_embeddings
from rag.vector_store import VectorStore


class Retriever:
    """
    Retrieve the most relevant knowledge chunks
    from the vector store.
    """

    def __init__(self, vector_store: VectorStore):
        self.vector_store = vector_store

    def retrieve(self, query: str, top_k: int = 3):
        """
        Retrieve the most relevant knowledge chunks for a query.
        """

        query = (query or "").strip()

        if not query:
            return []

        embeddings = create_embeddings([query])

        if embeddings is None or len(embeddings) == 0:
            return []

        query_embedding = embeddings[0]

        return self.vector_store.search(
            query_embedding,
            top_k=top_k,
        )