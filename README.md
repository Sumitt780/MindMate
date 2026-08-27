# 🧠 MindMate

> An AI-powered wellness and mood tracking application built with React, Node.js, Python, NLP, RAG, and Gemini.

MindMate is a full-stack AI/ML project designed to provide supportive conversations, mood tracking, emotional analysis, personalized insights, and a visual mood garden.

---

## ✨ Features

- 🤖 AI-powered conversational assistant
- 😊 Emotion detection
- 💭 Sentiment analysis
- 🎯 Intent detection
- 📚 RAG-based knowledge retrieval
- 🧠 Gemini-powered AI responses
- 🛡️ AI response safety layer
- 🌸 Mood check-ins
- 🌱 Visual mood garden
- 📊 Mood insights
- 🗂️ Mood history
- 🔐 User registration and login
- 👤 Profile management
- ⚙️ Settings
- 📱 Responsive user interface

---

## 🛠️ Tech Stack

### ⚛️ Frontend

- React
- Vite
- JavaScript
- CSS
- Lucide React

### 🟢 Backend

- Node.js
- Express.js
- REST API
- Authentication

### 🐍 AI Service

- Python
- FastAPI
- Uvicorn
- Hugging Face Transformers
- Sentence Transformers
- NumPy
- Google GenAI
- python-dotenv

### 🤖 AI / ML

| Component | Technology |
|---|---|
| 😊 Emotion Detection | `j-hartmann/emotion-english-distilroberta-base` |
| 💭 Sentiment Analysis | `distilbert-base-uncased-finetuned-sst-2-english` |
| 🔢 Embeddings | `all-MiniLM-L6-v2` |
| 🧠 LLM | Gemini |

---

# 🏗️ System Architecture

```text
                         🧠 MindMate
                              |
              +---------------+---------------+
              |               |               |
              v               v               v
        ⚛️ Frontend      🟢 Backend       🐍 AI Service
          React           Node.js           FastAPI
              |               |               |
              +---------------+---------------+
                              |
                         🤖 AI Pipeline
                              |
          +-------------------+-------------------+
          |                   |                   |
          v                   v                   v
    😊 Emotion          💭 Sentiment        🎯 Intent
     Detection           Analysis          Detection
          |                   |                   |
          +-------------------+-------------------+
                              |
                              v
                         📚 RAG System
                              |
              +---------------+---------------+
              |               |               |
              v               v               v
        📄 Documents     🔢 Embeddings    🗃️ Vector Store
              |               |               |
              +---------------+---------------+
                              |
                              v
                       🔎 Retrieval
                              |
                              v
                     📝 Prompt Builder
                              |
                              v
                         🧠 Gemini
                              |
                              v
                       🛡️ Safety Check
                              |
                              v
                         💬 Response