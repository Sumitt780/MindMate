from rag.documents import load_and_chunk_documents
from rag.embeddings import create_embeddings
from rag.vector_store import VectorStore
from rag.retriever import Retriever
from rag.context import build_context


class RAGService:

    def __init__(self):
        print("Initializing RAG service...")

        chunks = load_and_chunk_documents()

        print(f"Loaded {len(chunks)} knowledge chunks.")

        embeddings = create_embeddings(chunks)

        self.vector_store = VectorStore()

        self.vector_store.add(
            chunks,
            embeddings
        )

        self.retriever = Retriever(
            self.vector_store
        )

        print("RAG service initialized successfully!")

    def retrieve_context(
        self,
        query: str,
        top_k: int = 3
    ) -> str:

        results = self.retriever.retrieve(
            query,
            top_k=top_k
        )

        return build_context(results)