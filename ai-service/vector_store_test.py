from rag.documents import load_and_chunk_documents
from rag.embeddings import create_embeddings
from rag.vector_store import VectorStore


chunks = load_and_chunk_documents()

embeddings = create_embeddings(chunks)

store = VectorStore()

store.add(chunks, embeddings)

query = "How can I manage stress?"

query_embedding = create_embeddings([query])[0]

results = store.search(
    query_embedding,
    top_k=3
)

print("Search results:")

for result in results:
    print("\nScore:", result["score"])
    print("Document:", result["document"][:300])