# 🌱 MindMate

MindMate is a full-stack wellness application for daily mood check-ins, journaling, mood tracking, and AI-assisted conversations.

It provides a simple space to reflect, track patterns, and understand day-to-day emotional changes.

## ✨ Features

* 🌸 Daily mood and energy check-ins
* 📖 Personal journal and mood history
* 🤖 AI-assisted conversations
* 🌱 30-day mood garden and streak tracking
* 📊 Mood insights and statistics
* 👤 User authentication and profile
* ⚙️ Settings and notification preferences
* 📱 Responsive interface

## 🛠️ Tech Stack

**Frontend**

* React
* Vite
* CSS

**AI Service**

* Python
* FastAPI
* Modular AI pipeline
* RAG components

**Tools**

* Git
* GitHub

## 🚀 Getting Started

### 1. Requirements

Install the following:

* Git
* Python 3.10+
* Node.js and npm

Check your installation:

```bash
git --version
python --version
node --version
npm --version
```

### 2. Clone the repository

```bash
git clone https://github.com/Sumitt780/MindMate.git
cd MindMate
```

### 3. Set up the AI service

Open a terminal in the project folder:

```bash
cd ai-service
```

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

If the project requires environment variables, create a `.env` file in the required service directory and add the required keys.

For example:

```env
OPENAI_API_KEY=your_api_key_here
```

> Do not commit `.env` files or API keys to GitHub.

### 5. Start the AI service

From `ai-service`:

```bash
uvicorn main:app --reload
```

Keep this terminal running.

### 6. Start the frontend

Open a **new terminal**:

```bash
cd MindMate/frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display a local URL such as:

```text
http://localhost:5173
```

Open the URL shown in your terminal.

## 🔧 Running the Project

You need two terminals running:

**Terminal 1 — AI Service**

```bash
cd MindMate/ai-service
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

**Terminal 2 — Frontend**

```bash
cd MindMate/frontend
npm run dev
```

Then open the URL provided by Vite.

## 🔐 Security

* Keep API keys and secrets in environment variables.
* Never commit `.env` files containing sensitive information.
* Do not expose private user data in logs or screenshots.

## 📄 License

No license has been specified yet.

---

🌱 **MindMate — Reflect. Understand. Grow.**
