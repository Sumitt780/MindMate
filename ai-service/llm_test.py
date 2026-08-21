from ai.llm import generate_llm_response
from ai.prompt import build_mindmate_prompt


text = "I am really worried about my exam tomorrow."

prompt = build_mindmate_prompt(
    text=text,
    emotion="fear",
    sentiment="negative",
    intent="study_stress"
)

print("Sending MindMate prompt to LLM...")

response = generate_llm_response(prompt)

print("\nMindMate response:")
print(response)