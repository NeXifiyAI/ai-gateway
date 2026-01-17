#!/usr/bin/env node

/**
 * AI Gateway - GitHub Setup & Push Script
 * Prepares repository for Vercel deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(msg, color = 'reset') {
  console.log(`${COLORS[color]}${msg}${COLORS.reset}`);
}

function exec(cmd, desc) {
  try {
    log(`\n▶️  ${desc}...`, 'blue');
    execSync(cmd, { stdio: 'inherit' });
    log(`✅ ${desc}`, 'green');
  } catch (error) {
    log(`❌ ${desc} failed!`, 'yellow');
    throw error;
  }
}

log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
log('║        🚀 AI GATEWAY - GITHUB SETUP & DEPLOY 🚀          ║', 'cyan');
log('╚════════════════════════════════════════════════════════════╝', 'cyan');

try {
  // Check if in ai-gateway directory
  if (!fs.existsSync('vercel.json')) {
    log('\n❌ Not in ai-gateway directory!', 'yellow');
    log('   Run from: C:\\Users\\pcour\\Desktop\\ai-gateway', 'blue');
    process.exit(1);
  }

  log('\n✅ In correct directory!', 'green');

  // Initialize git
  log('\n1️⃣  Git Setup', 'bright');
  
  if (!fs.existsSync('.git')) {
    exec('git init', 'Initialize git');
  } else {
    log('   (Git already initialized)', 'yellow');
  }

  // Configure git
  try {
    execSync('git config user.email', { stdio: 'ignore' });
  } catch {
    exec('git config user.email "bot@nexifiyai.com"', 'Set git email');
    exec('git config user.name "NeXifiyAI Bot"', 'Set git name');
  }

  // Add all files
  exec('git add .', 'Stage all files');

  // Commit
  try {
    exec('git commit -m "🚀 Initial commit: Universal AI Gateway - One API for all AI services"', 'Create commit');
  } catch {
    log('   (No changes to commit)', 'yellow');
  }

  // Show status
  log('\n2️⃣  Repository Status', 'bright');
  execSync('git status', { stdio: 'inherit' });

  log('\n3️⃣  Git Log', 'bright');
  try {
    execSync('git log --oneline -3', { stdio: 'inherit' });
  } catch {
    log('   (No commits yet)', 'yellow');
  }

  // Show next steps
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║              📋 NEXT STEPS - DO THIS NOW:                ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝', 'cyan');

  log('\n1️⃣  CREATE GITHUB REPOSITORY:', 'bright');
  log('   https://github.com/new', 'blue');
  log('   Repository name: ai-gateway', 'yellow');
  log('   Description: Universal AI Gateway - One API for all AI', 'yellow');
  log('   Public ✅', 'yellow');
  log('   Create Repository', 'yellow');

  log('\n2️⃣  ADD GITHUB REMOTE:', 'bright');
  log('   git remote add origin https://github.com/YOUR_USERNAME/ai-gateway.git', 'blue');
  log('   git branch -M main', 'blue');
  log('   git push -u origin main', 'blue');

  log('\n3️⃣  CONNECT TO VERCEL:', 'bright');
  log('   https://vercel.com/new', 'blue');
  log('   Select: ai-gateway repository', 'blue');
  log('   Auto-configures Node.js ✅', 'yellow');
  log('   Add Environment Variables (settings)', 'yellow');
  log('   Deploy!', 'green');

  log('\n4️⃣  ADD ENVIRONMENT VARIABLES IN VERCEL:', 'bright');
  log('   Project Settings → Environment Variables', 'blue');
  log('   GEMINI_API_KEY = your_key', 'yellow');
  log('   GROQ_API_KEY = your_key', 'yellow');
  log('   (Add others as needed)', 'yellow');

  log('\n5️⃣  REDEPLOY & TEST:', 'bright');
  log('   Vercel automatically redeploys', 'blue');
  log('   Test: https://your-project.vercel.app/api/health', 'cyan');

  log('\n═══════════════════════════════════════════════════════════', 'cyan');
  log('Files ready for push:', 'bright');
  log('✅ api/ - Vercel Edge Functions', 'green');
  log('✅ clients/ - Python & JavaScript', 'green');
  log('✅ docker/ - Local development', 'green');
  log('✅ vercel.json - Config', 'green');
  log('✅ package.json - Dependencies', 'green');
  log('✅ README.md - Documentation', 'green');
  log('✅ .env.example - Template', 'green');

  log('\n🎯 DEPLOYMENT CHECKLIST:', 'bright');
  log('☐ Create repo on GitHub', 'blue');
  log('☐ Add remote & push code', 'blue');
  log('☐ Connect Vercel to GitHub', 'blue');
  log('☐ Add environment variables', 'blue');
  log('☐ Vercel auto-deploys', 'green');
  log('☐ Test /api/health endpoint', 'green');
  log('☐ Done! 🚀', 'green');

  log('\n═══════════════════════════════════════════════════════════', 'cyan');
  log('💡 Pro Tip:', 'yellow');
  log('   After creating GitHub repo:', 'yellow');
  log('   git remote add origin https://github.com/USERNAME/ai-gateway.git', 'blue');
  log('   git push -u origin main', 'blue');
  log('   Then Vercel auto-deploys! 🚀', 'green');

  log('\n✨ Ready to deploy! Go create the GitHub repo first! 🎉\n', 'bright');

} catch (error) {
  log(`\n❌ Error: ${error.message}`, 'yellow');
  process.exit(1);
}
