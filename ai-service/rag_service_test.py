from rag.rag_service import RAGService


rag = RAGService()

query = "How can I manage stress?"

context = rag.retrieve_context(
    query,
    top_k=3
)

print("\nRetrieved RAG Context:")
print(context)