from rag.documents import load_and_chunk_documents
from rag.embeddings import create_embeddings
from rag.vector_store import VectorStore
from rag.retriever import Retriever
from rag.context import build_context

from ai.prompt import build_mindmate_prompt


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

prompt = build_mindmate_prompt(
    text=query,
    emotion="stress",
    sentiment="negative",
    intent="stress_management",
    context=context
)

print("RAG PROMPT:")
print(prompt)