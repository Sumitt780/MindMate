import os

from dotenv import load_dotenv
from google import genai


# ---------------------------------------------------------
# Environment
# ---------------------------------------------------------

load_dotenv()


API_KEY = os.getenv("LLM_API_KEY")
MODEL = os.getenv("LLM_MODEL", "gemini-2.5-flash")


if not API_KEY:
    raise ValueError(
        "LLM_API_KEY is not configured. "
        "Please add LLM_API_KEY to ai-service/.env"
    )


# ---------------------------------------------------------
# Gemini client
# ---------------------------------------------------------

client = genai.Client(api_key=API_KEY)


# ---------------------------------------------------------
# LLM response
# ---------------------------------------------------------

def generate_llm_response(prompt: str) -> str:
    """
    Generate a response using the configured Gemini model.
    """

    if not prompt or not prompt.strip():
        return (
            "I'm here with you. "
            "Tell me a little more about what's on your mind."
        )

    try:
        response = client.models.generate_content(
            model=MODEL,
            contents=prompt.strip(),
        )

        text = getattr(response, "text", None)

        if text and text.strip():
            return text.strip()

        return (
            "I'm here with you. "
            "Could you tell me a little more?"
        )

    except Exception as exc:
        print(f"LLM error: {exc}")

        return (
            "I'm having a little trouble responding right now. "
            "Please try again in a moment."
        )