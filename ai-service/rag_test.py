from rag.documents import load_and_chunk_documents


chunks = load_and_chunk_documents()

print("Total chunks:", len(chunks))

for index, chunk in enumerate(chunks[:3], start=1):
    print(f"\n--- Chunk {index} ---")
    print(chunk)