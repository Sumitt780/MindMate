@echo off
title MindMate Launcher

cd /d "E:\MindMate Project\mindmate-fullstack"

echo ==========================================
echo          MINDMATE PROJECT
echo ==========================================
echo.

echo Starting Backend...
start "MindMate Backend" powershell -NoExit -Command "cd 'E:\MindMate Project\mindmate-fullstack\backend'; npm run dev"

timeout /t 2 /nobreak >nul

echo Starting AI Service...
start "MindMate AI" powershell -NoExit -Command "cd 'E:\MindMate Project\mindmate-fullstack\ai-service'; & 'E:\MindMate Project\mindmate-fullstack\.venv\Scripts\python.exe' -m uvicorn main:app --port 8000"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "MindMate Frontend" powershell -NoExit -Command "cd 'E:\MindMate Project\mindmate-fullstack\frontend'; npm run dev"

timeout /t 5 /nobreak >nul

start http://localhost:5173

echo.
echo MindMate started!
echo.
pause