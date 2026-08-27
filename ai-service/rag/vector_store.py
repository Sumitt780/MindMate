import numpy as np


class VectorStore:
    """
    Simple in-memory vector store using cosine similarity.

    Embeddings are normalized before being stored, so the dot
    product can be used directly as the similarity score.
    """

    def __init__(self):
        self.documents: list[str] = []
        self.embeddings = None

    def add(self, documents, embeddings):
        """
        Add documents and their corresponding embeddings.
        """

        if not documents or embeddings is None:
            return

        if len(documents) == 0:
            return

        embeddings = np.asarray(embeddings, dtype=np.float32)

        if embeddings.size == 0:
            return

        if embeddings.ndim == 1:
            embeddings = embeddings.reshape(1, -1)

        if len(documents) != len(embeddings):
            raise ValueError(
                "Number of documents must match number of embeddings."
            )

        if self.embeddings is None:
            self.embeddings = embeddings
            self.documents.extend(documents)
            return

        if self.embeddings.shape[1] != embeddings.shape[1]:
            raise ValueError(
                "Embedding dimensions do not match the existing vector store."
            )

        self.embeddings = np.vstack(
            [self.embeddings, embeddings]
        )

        self.documents.extend(documents)

    def search(self, query_embedding, top_k=3):
        """
        Return the most similar documents for a query embedding.
        """

        if (
            self.embeddings is None
            or len(self.documents) == 0
        ):
            return []

        if query_embedding is None:
            return []

        try:
            top_k = max(1, int(top_k))
        except (TypeError, ValueError):
            top_k = 3

        query_embedding = np.asarray(
            query_embedding,
            dtype=np.float32,
        )

        if query_embedding.size == 0:
            return []

        if query_embedding.ndim > 1:
            query_embedding = query_embedding.reshape(-1)

        if query_embedding.shape[0] != self.embeddings.shape[1]:
            raise ValueError(
                "Query embedding dimension does not match "
                "the vector store."
            )

        scores = self.embeddings @ query_embedding

        top_k = min(top_k, len(self.documents))

        top_indices = np.argsort(scores)[::-1][:top_k]

        results = []

        for index in top_indices:
            results.append(
                {
                    "document": self.documents[index],
                    "score": float(scores[index]),
                }
            )

        return results