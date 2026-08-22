from rag.documents import load_and_chunk_documents
from rag.embeddings import create_embeddings


chunks = load_and_chunk_documents()

embeddings = create_embeddings(chunks)

print("Number of chunks:", len(chunks))
print("Embedding shape:", embeddings.shape)
print("First vector (first 10 values):")
print(embeddings[0][:10])