def build_context(results: list[dict], max_chars: int = 3000) -> str:
    """
    Convert retrieved results into a compact context
    for the LLM prompt.
    """

    if not results:
        return "No relevant knowledge was found."

    context_parts = []
    total_chars = 0

    for index, result in enumerate(results, start=1):
        document = result["document"].strip()

        if not document:
            continue

        section = (
            f"[Knowledge {index}]\n"
            f"{document}\n"
        )

        if total_chars + len(section) > max_chars:
            break

        context_parts.append(section)
        total_chars += len(section)

    return "\n".join(context_parts)