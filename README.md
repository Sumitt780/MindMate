# 🌱 MindMate

> An AI-powered mood tracking and mental wellness companion built with React, Express, FastAPI, Emotion & Sentiment Analysis, and RAG.

MindMate helps users understand and track their emotional well-being through daily mood check-ins, energy tracking, personal journal entries, an AI-powered conversational assistant, emotion/sentiment analysis, and a visual mood garden.

---

## ✨ Features

### 🌸 Daily Mood Check-ins

- Select a daily mood from five mood states:
  - Stormy
  - Cloudy
  - Still
  - Sunny
  - Radiant
- Track daily energy levels.
- Add optional journal notes.
- Update today's entry whenever needed.
- View previous mood entries in your history.

### 🌱 Mood Garden

Each daily check-in creates a visual bloom.

- Bloom color represents mood.
- Bloom size represents energy.
- Previous entries appear as a visual garden strip.
- Makes mood history easier to understand at a glance.

### 📊 Insights & Statistics

MindMate provides mood-related insights including:

- Current streak
- Top mood
- Mood trends
- Recent activity
- Historical entries

### 🤖 AI Mental Wellness Chat

MindMate includes an AI-powered conversational assistant.

Users can describe how they are feeling and receive supportive responses.

The AI pipeline includes:

- Emotion classification
- Sentiment analysis
- Intent detection
- Retrieval-Augmented Generation (RAG)
- Safety-aware responses

### 🧠 Emotion & Sentiment Analysis

AI responses can include:

- Detected emotion
- Sentiment
- Confidence information from the AI services

The frontend displays emotion and sentiment badges alongside AI responses.

### 💬 Persistent Chat History

Chat conversations are stored per user.

Features include:

- Load previous conversations
- Save user messages
- Save AI responses
- Preserve emotion and sentiment
- Timestamps
- Clear chat history
- Automatic scrolling to the latest message

### 🔐 Authentication

MindMate includes:

- User registration
- User login
- JWT authentication
- Protected API routes
- User-specific mood entries
- User-specific chat history

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │       React UI       │
                         │        Vite          │
                         │    localhost:5173    │
                         └──────────┬───────────┘
                                    │
                                    │ /api
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │    localhost:4000    │
                         │                      │
                         │ JWT Authentication   │
                         │ Mood Entries         │
                         │ Statistics            │
                         │ Chat History          │
                         └──────────┬───────────┘
                                    │
                                    │ AI Requests
                                    ▼
                         ┌──────────────────────┐
                         │    FastAPI AI        │
                         │    localhost:8000    │
                         │                      │
                         │ Emotion Analysis     │
                         │ Sentiment Analysis   │
                         │ Intent Detection     │
                         │ RAG Pipeline         │
                         │ Safety Processing    │
                         └──────────────────────┘
