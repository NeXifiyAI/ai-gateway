#!/bin/bash

# AI Gateway - Complete Setup Script
# Runs all preparation steps

echo "╔════════════════════════════════════════════════════════════╗"
echo "║        🚀 AI GATEWAY - COMPLETE SETUP 🚀                 ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not installed!"
  exit 1
fi

echo "✅ Node.js: $(node -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Show git status
echo ""
echo "📋 Git Status:"
node setup-git.js

echo ""
echo "✅ All done! Follow the next steps above! 🚀"
