def generate_response(emotion: str, sentiment: str, intent: str) -> str:

    if intent == "study_stress":
        return (
            "Exam ko lekar worried feel karna understandable hai. "
            "Chalo situation ko manageable banate hain—pehle important topics "
            "identify karo aur unhe small study sessions mein divide karo."
        )

    if intent == "emotional_support":
        return (
            "Aisa feel karna difficult ho sakta hai. "
            "Agar tum comfortable ho, batao ki abhi sabse zyada kya bother kar raha hai."
        )

    if intent == "anger_support":
        return (
            "Lag raha hai ki situation ne tumhe kaafi frustrate kiya hai. "
            "Thoda pause lena aur calmly situation ko break down karna helpful ho sakta hai."
        )

    if intent == "greeting":
        return (
            "Hey! 👋 Main MindMate hoon. "
            "Aaj tum kaisa feel kar rahe ho?"
        )

    if intent == "positive_conversation":
        return (
            "That's great to hear! 😊 "
            "Aaj ka best part mere saath share karna chahoge?"
        )

    if emotion == "sadness":
        return (
            "I'm sorry you're having a difficult moment. "
            "Agar tum chaho, tum mujhe bata sakte ho ki kya hua."
        )

    if emotion == "fear":
        return (
            "Lagta hai tumhare mind mein kuch worry chal rahi hai. "
            "Chalo ise step-by-step samajhne ki koshish karte hain."
        )

    if emotion == "anger":
        return (
            "Lag raha hai tum kaafi frustrated ho. "
            "Thoda pause lekar situation ko calmly dekhna helpful ho sakta hai."
        )

    return (
        "Main tumhari baat samajhne ki koshish kar raha hoon. "
        "Agar tum comfortable ho, thoda aur batao."
    )