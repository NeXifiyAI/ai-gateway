@echo off
REM AI Gateway - Quick Push to GitHub
REM Run this AFTER creating the GitHub repo and adding remote

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║          📤 AI GATEWAY - PUSH TO GITHUB 📤               ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check git status
echo 📋 Current Git Status:
git status

echo.
echo 📤 Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
  echo.
  echo ✅ Successfully pushed to GitHub! 🎉
  echo.
  echo 🌐 Next: Go to Vercel and connect this repo!
  echo    https://vercel.com/new
  echo.
) else (
  echo.
  echo ❌ Push failed!
  echo.
  echo Did you:
  echo 1. Create the GitHub repo?
  echo 2. Add remote? (git remote add origin ...)
  echo.
)

pause
