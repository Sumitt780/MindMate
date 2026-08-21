def check_response_safety(response: str) -> dict:
    """
    Basic safety layer for MindMate responses.
    """

    text = response.lower()

    risk_keywords = [
        "kill myself",
        "suicide",
        "end my life",
        "self harm",
        "hurt myself",
        "want to die"
    ]

    detected_risk = any(keyword in text for keyword in risk_keywords)

    if detected_risk:
        return {
            "safe": False,
            "response": (
                "I'm really sorry you're going through this. "
                "You don't have to handle this alone. "
                "Please reach out to someone you trust and seek "
                "immediate professional or emergency support if "
                "you may be in immediate danger."
            )
        }

    return {
        "safe": True,
        "response": response
    }