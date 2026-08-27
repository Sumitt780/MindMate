from rag.documents import load_and_chunk_documents
from rag.embeddings import create_embeddings
from rag.vector_store import VectorStore
from rag.retriever import Retriever
from rag.context import build_context


class RAGService:
    """
    MindMate Retrieval-Augmented Generation service.

    It:
    1. Loads knowledge-base documents.
    2. Splits them into chunks.
    3. Creates embeddings.
    4. Stores the embeddings.
    5. Retrieves relevant context for user queries.
    """

    def __init__(self):
        print("Initializing RAG service...")

        self.vector_store = VectorStore()
        self.retriever = Retriever(self.vector_store)

        try:
            chunks = load_and_chunk_documents()

            print(f"Loaded {len(chunks)} knowledge chunks.")

            if not chunks:
                print(
                    "Warning: No knowledge-base documents were found."
                )
                return

            embeddings = create_embeddings(chunks)

            if embeddings is None or len(embeddings) == 0:
                print(
                    "Warning: Could not create knowledge embeddings."
                )
                return

            self.vector_store.add(
                chunks,
                embeddings,
            )

            print(
                "RAG service initialized successfully!"
            )

        except Exception as exc:
            print(f"RAG initialization warning: {exc}")

    def retrieve_context(
        self,
        query: str,
        top_k: int = 3,
    ) -> str:
        """
        Retrieve relevant knowledge and convert it
        into context for the LLM.
        """

        query = (query or "").strip()

        if not query:
            return "No relevant knowledge was found."

        try:
            results = self.retriever.retrieve(
                query,
                top_k=top_k,
            )

            return build_context(results)

        except Exception as exc:
            print(f"RAG retrieval error: {exc}")

            return "No relevant knowledge was found."