def build_context(
    results: list[dict],
    max_chars: int = 3000,
) -> str:
    """
    Convert retrieved results into a compact context
    for the LLM prompt.
    """

    if not results:
        return "No relevant knowledge was found."

    if max_chars <= 0:
        return "No relevant knowledge was found."

    context_parts = []
    total_chars = 0

    for index, result in enumerate(results, start=1):
        if not isinstance(result, dict):
            continue

        document = result.get("document", "")

        if not isinstance(document, str):
            continue

        document = document.strip()

        if not document:
            continue

        section = (
            f"[Knowledge {index}]\n"
            f"{document}\n"
        )

        # Don't exceed the context limit.
        if total_chars + len(section) > max_chars:
            remaining = max_chars - total_chars

            if remaining > 50:
                section = section[:remaining].rstrip()
                context_parts.append(section)
                total_chars += len(section)

            break

        context_parts.append(section)
        total_chars += len(section)

    if not context_parts:
        return "No relevant knowledge was found."

    return "\n".join(context_parts)