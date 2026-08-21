import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

API_KEY = os.getenv("LLM_API_KEY")
MODEL = os.getenv("LLM_MODEL", "gemini-3.5-flash-lite")

if not API_KEY:
    raise ValueError("LLM_API_KEY is not configured.")

client = genai.Client(api_key=API_KEY)


def generate_llm_response(prompt: str) -> str:
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt
    )

    return response.text.strip()