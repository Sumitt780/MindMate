from rag.embeddings import create_embeddings
from rag.vector_store import VectorStore


class Retriever:
    def __init__(self, vector_store: VectorStore):
        self.vector_store = vector_store

    def retrieve(self, query: str, top_k: int = 3):
        """
        Retrieve the most relevant knowledge chunks for a query.
        """

        query_embedding = create_embeddings([query])[0]

        results = self.vector_store.search(
            query_embedding,
            top_k=top_k
        )

        return results