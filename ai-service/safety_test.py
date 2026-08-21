from ai.safety import check_response_safety


normal_response = (
    "It's understandable to feel worried about your exam. "
    "Try taking a short break and focus on one topic at a time."
)

result = check_response_safety(normal_response)

print(result)