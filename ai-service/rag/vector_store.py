import numpy as np


class VectorStore:
    def __init__(self):
        self.documents = []
        self.embeddings = None

    def add(self, documents, embeddings):
        self.documents.extend(documents)

        embeddings = np.asarray(embeddings)

        if self.embeddings is None:
            self.embeddings = embeddings
        else:
            self.embeddings = np.vstack(
                [self.embeddings, embeddings]
            )

    def search(self, query_embedding, top_k=3):
        if self.embeddings is None or len(self.documents) == 0:
            return []

        query_embedding = np.asarray(query_embedding)

        scores = self.embeddings @ query_embedding

        top_indices = np.argsort(scores)[::-1][:top_k]

        results = []

        for index in top_indices:
            results.append({
                "document": self.documents[index],
                "score": float(scores[index])
            })

        return results