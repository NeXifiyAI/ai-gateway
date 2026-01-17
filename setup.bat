@echo off
REM AI Gateway - Complete Setup Script (Windows)
REM Runs all preparation steps

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║        🚀 AI GATEWAY - COMPLETE SETUP 🚀                 ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Node.js not installed!
  pause
  exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js: %NODE_VERSION%

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

REM Show git status
echo.
echo 📋 Git Status:
call node setup-git.js

echo.
echo ✅ All done! Follow the next steps above! 🚀
echo.
pause
