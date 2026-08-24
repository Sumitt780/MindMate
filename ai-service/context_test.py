from rag.documents import load_and_chunk_documents
from rag.embeddings import create_embeddings
from rag.vector_store import VectorStore
from rag.retriever import Retriever
from rag.context import build_context


chunks = load_and_chunk_documents()

embeddings = create_embeddings(chunks)

store = VectorStore()
store.add(chunks, embeddings)

retriever = Retriever(store)

query = "How can I manage stress?"

results = retriever.retrieve(
    query,
    top_k=3
)

context = build_context(results)

print("RAG CONTEXT:")
print(context)