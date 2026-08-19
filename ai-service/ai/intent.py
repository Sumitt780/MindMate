def detect_intent(text: str):
    text_lower = text.lower()

    if any(word in text_lower for word in [
        "exam",
        "study",
        "studying",
        "test",
        "assignment",
        "college"
    ]):
        return "study_stress"

    if any(word in text_lower for word in [
        "sad",
        "lonely",
        "alone",
        "cry",
        "depressed"
    ]):
        return "emotional_support"

    if any(word in text_lower for word in [
        "angry",
        "anger",
        "mad",
        "frustrated"
    ]):
        return "anger_support"

    if any(word in text_lower for word in [
        "hello",
        "hi",
        "hey"
    ]):
        return "greeting"

    if any(word in text_lower for word in [
        "happy",
        "great",
        "excited",
        "good"
    ]):
        return "positive_conversation"

    return "general_conversation"