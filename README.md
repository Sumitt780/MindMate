🌱 MindMate

Your private wellness space for daily reflection, mood tracking, and AI-supported conversations.

MindMate is a full-stack wellness application designed to help users reflect on how they are feeling, record daily check-ins, understand mood patterns, and interact with an AI companion in a private space.

✨ Features

🌸 Daily Mood Check-in

Select your current mood.

Select your energy level.

Add an optional journal note.

Update an existing check-in for the day.

🤖 MindMate AI

Private conversational space for reflection.

AI-assisted responses based on the user's conversation/context.

🌱 Personal Mood Garden

Every check-in contributes a bloom to the garden.

View mood growth across the last 30 days.

Track current check-in streaks.

Visualize missed and completed days.

📊 Insights

View mood and check-in patterns.

Review wellness statistics.

📖 Mood History

Review previous check-ins.

Delete an individual history entry.

👤 Profile

View/manage the MindMate profile area.

⚙️ Settings

Notification preferences.

Calm interface information.

Privacy information.

🔔 Notifications

Daily check-in reminders.

Check-in confirmation.

Streak updates.

🔐 Authentication

Account registration.

Login/logout.

Session/token-based authentication.

📱 Responsive UI

Designed for desktop and smaller screens.

🧱 Project Structure

mindmate-fullstack/
│
├── ai-service/
│   ├── ai/
│   │   ├── emotion.py
│   │   ├── intent.py
│   │   ├── llm.py
│   │   ├── prompt.py
│   │   ├── response.py
│   │   ├── safety.py
│   │   └── sentiment.py
│   │
│   ├── rag/
│   │   ├── context.py
│   │   ├── documents.py
│   │   ├── embeddings.py
│   │   ├── rag_service.py
│   │   ├── retriever.py
│   │   └── vector_store.py
│   │
│   ├── knowledge_base/
│   ├── main.py
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChat.jsx
│   │   │   ├── Bloom.jsx
│   │   │   ├── CheckIn.jsx
│   │   │   ├── GardenStrip.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Insights.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sparkline.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── constants.js
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md

🛠️ Requirements

Before running MindMate, install:

1. Git

Check:

git --version

2. Python

Recommended: Python 3.10+

Check:

python --version

3. Node.js and npm

Check:

node --version
npm --version

Node.js should be installed before starting the frontend.

🚀 Installation

Step 1 — Clone the repository

git clone https://github.com/Sumitt780/MindMate.git

Move into the project:

cd MindMate

If you already have the project locally, simply:

cd E:\MindMate Project\mindmate-fullstack

🐍 Step 2 — Set up the Python environment

From the project root:

cd ai-service

Create a virtual environment:

python -m venv .venv

Activate it on Windows PowerShell:

.\.venv\Scripts\Activate.ps1

After activation, your terminal should look similar to:

(.venv) PS E:\MindMate Project\mindmate-fullstack\ai-service>

If PowerShell blocks activation, you can use:

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

Then activate again:

.\.venv\Scripts\Activate.ps1

📦 Step 3 — Install Python dependencies

If the ai-service folder contains requirements.txt, run:

pip install -r requirements.txt

If dependencies are defined through another project configuration file, install them according to that file.

Verify the environment:

pip list

🔑 Step 4 — Configure environment variables

Check whether the project contains an environment template such as:

.env.example

or documentation/configuration for required environment variables.

Create your local .env file if required.

Example:

# Example only — use the variables required by your project.

OPENAI_API_KEY=your_api_key_here

Important

Do not commit real API keys, passwords, tokens, or secrets to GitHub.

Your .gitignore should exclude:

.env
.venv/
node_modules/

🌐 Step 5 — Install frontend dependencies

Open a new PowerShell terminal.

Go to the frontend:

cd E:\MindMate Project\mindmate-fullstack\frontend

Install npm packages:

npm install

This only needs to be done the first time, or whenever package.json dependencies change.

▶️ Running MindMate

MindMate uses separate frontend and Python/AI services, so the easiest development setup is to keep them running in separate terminals.

Terminal 1 — AI Service

Open PowerShell:

cd E:\MindMate Project\mindmate-fullstack\ai-service

Activate the virtual environment:

.\.venv\Scripts\Activate.ps1

Start the Python service using the command defined by ai-service/main.py.

For a FastAPI/Uvicorn setup, this is commonly:

uvicorn main:app --reload

If the project uses a different startup command, use the command specified in the service configuration.

Keep this terminal running.

Terminal 2 — Frontend

Open another PowerShell window:

cd E:\MindMate Project\mindmate-fullstack\frontend

Start the Vite development server:

npm run dev

The terminal will display the local URL, for example:

Local: http://localhost:5173/

Open the displayed URL in your browser.

Important: Do not assume the port will always be 5173 or 5174. Vite can select another available port. Always use the URL printed by npm run dev.

⚡ Quick Start — After Everything Is Installed

Once the project has already been configured, you normally only need two terminals.

Terminal 1

cd E:\MindMate Project\mindmate-fullstack\ai-service
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload

Terminal 2

cd E:\MindMate Project\mindmate-fullstack\frontend
npm run dev

Then open the URL shown by Vite.

🧭 MindMate Navigation

After logging in, the application contains:

Dashboard
│
├── Journal
├── Chat with AI
├── My Garden
├── Insights
├── History
├── Profile
└── Settings

Only the selected section is rendered as the active page.

🌸 Daily Check-in Flow

Open Journal or Dashboard.

Select a mood.

Select an energy level.

Optionally write a journal note.

Click Save today's check-in.

The check-in is stored for the current date.

Your garden and statistics can update based on the saved entry.

🌱 Garden

The Garden represents consistency through visual blooms.

The garden can show:

🌸 Mood blooms

📅 Last 30 days

🌱 Number of planted days

🔥 Current streak

➕ Empty days awaiting a check-in

A completed check-in contributes to the user's garden.

🤖 AI Chat

The Chat with AI section provides a dedicated space for conversations.

The AI service contains separate modules for areas such as:

ai/
├── emotion.py
├── intent.py
├── llm.py
├── prompt.py
├── response.py
├── safety.py
└── sentiment.py

The project also contains a RAG-related layer:

rag/
├── context.py
├── documents.py
├── embeddings.py
├── rag_service.py
├── retriever.py
└── vector_store.py

This separation keeps AI processing, prompts, safety, retrieval, and frontend presentation organized.

🧪 Development Checks

Check frontend

From:

cd frontend

Run:

npm run dev

If the frontend starts successfully, Vite will print the local development URL.

Check Python service

From:

cd ai-service

Activate the environment:

.\.venv\Scripts\Activate.ps1

Then start the service.

For a Uvicorn/FastAPI configuration:

uvicorn main:app --reload

🐛 Common Problems

Problem 1 — npm is not recognized

Install Node.js and restart PowerShell.

Check:

node --version
npm --version

Problem 2 — Python is not recognized

Install Python and make sure Add Python to PATH is enabled.

Check:

python --version

Problem 3 — Virtual environment is not activated

From ai-service:

.\.venv\Scripts\Activate.ps1

You should see:

(.venv)

at the beginning of your terminal.

Problem 4 — npm run dev gives dependency errors

From frontend:

npm install

Then:

npm run dev

Problem 5 — Port 5173/5174 changed

This is normally not a project error.

If the default Vite port is busy, Vite can choose another available port.

For example:

Port 5173 is in use, trying another one...
Local: http://localhost:5174/

Use the URL shown in the terminal.

Problem 6 — API/AI features do not work

Make sure the Python/AI service is running in another terminal.

Frontend:

npm run dev

AI service:

uvicorn main:app --reload

Both services need to be available for features that depend on the backend/AI service.

Problem 7 — .env / API key error

Check that your required environment variables exist in the correct .env file.

Never upload secrets to GitHub.

🧹 Clean Frontend Reinstall

If the frontend gets into a broken dependency state, from frontend:

Remove-Item -Recurse -Force node_modules

Then:

npm install

Then:

npm run dev

If PowerShell refuses to remove node_modules, close running Vite/node processes first.

🧹 Recreate Python Environment

If the Python environment becomes corrupted:

From ai-service:

deactivate

Then remove the environment:

Remove-Item -Recurse -Force .venv

Create it again:

python -m venv .venv

Activate:

.\.venv\Scripts\Activate.ps1

Install dependencies:

pip install -r requirements.txt

🔄 Updating the Project

Before starting work:

git pull --rebase origin main

After making changes:

git status

Stage changes:

git add .

Commit:

git commit -m "describe your changes"

Push:

git push origin main

⚠️ If Git Push Says "Fetch First"

If Git says:

! [rejected] main -> main (fetch first)

use:

git pull --rebase origin main

If there is a conflict:

Open the conflicted file.

Resolve the conflict.

Save it.

Stage it:

git add .

Continue:

git rebase --continue

Finally:

git push origin main

Do not use force push unless you intentionally understand the consequences.

📁 Important Files

Frontend

frontend/
├── src/App.jsx
├── src/api.js
├── src/constants.js
└── src/components/

Important components include:

CheckIn.jsx

AIChat.jsx

GardenStrip.jsx

Insights.jsx

History.jsx

Profile.jsx

Settings.jsx

Sidebar.jsx

Login.jsx

AI Service

ai-service/
├── main.py
├── ai/
├── rag/
└── knowledge_base/

🔐 Privacy & Security

MindMate is intended as a private wellness space.

Development/security guidelines:

Never commit .env files containing secrets.

Never hard-code API keys.

Never commit access tokens.

Keep user data protected.

Use environment variables for credentials.

Do not expose private user information in logs or screenshots.

💡 Recommended Development Workflow

Use this workflow whenever you work on MindMate:

1. Open project
       ↓
2. Start AI service
       ↓
3. Start frontend
       ↓
4. Open browser
       ↓
5. Test the feature
       ↓
6. git status
       ↓
7. git add .
       ↓
8. git commit
       ↓
9. git push

🛑 Stopping the Project

To stop a running development server:

Ctrl + C

Do this separately in each terminal.

📌 Quick Commands Cheat Sheet

Task

Command

Enter project

cd E:\MindMate Project\mindmate-fullstack

Enter AI service

cd ai-service

Activate Python env

.\.venv\Scripts\Activate.ps1

Install Python packages

pip install -r requirements.txt

Start AI service

uvicorn main:app --reload

Enter frontend

cd frontend

Install frontend packages

npm install

Start frontend

npm run dev

Git status

git status

Stage changes

git add .

Commit

git commit -m "message"

Push

git push origin main

Pull updates

git pull --rebase origin main

🌟 Project Goal

MindMate aims to make daily emotional reflection simple and approachable.

Instead of overwhelming the user with complex wellness tools, the application focuses on small actions:

Check in → Reflect → Understand → Grow 🌱

Every small check-in contributes to a clearer picture of personal patterns and progress.

👨‍💻 Development

MindMate is being developed as a full-stack application with:

Frontend: React + Vite

Frontend styling: CSS

Backend/AI service: Python

AI processing: Modular AI pipeline

RAG: Retrieval and vector-store based components

Authentication: Session/token based flow

Version control: Git + GitHub

📄 License

Add the project's intended license here if/when one is selected.

🌱 MindMate

Your wellness space.
Your reflections.
Your growth.