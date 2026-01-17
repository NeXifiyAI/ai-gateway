#!/usr/bin/env node

/**
 * AI Gateway Deploy Script
 * Pushes to GitHub and deploys to Vercel automatically
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function exec(command, description) {
  try {
    log(`\n▶️  ${description}...`, 'blue');
    const output = execSync(command, { encoding: 'utf-8', stdio: 'inherit' });
    log(`✅ ${description} completed!`, 'green');
    return output;
  } catch (error) {
    log(`❌ ${description} failed!`, 'red');
    throw error;
  }
}

async function deploy() {
  log('\n╔════════════════════════════════════════════════════════════╗', 'bright');
  log('║        🚀 AI GATEWAY - DEPLOY TO VERCEL 🚀               ║', 'bright');
  log('╚════════════════════════════════════════════════════════════╝', 'bright');

  try {
    // Check if .env exists
    if (!fs.existsSync('.env')) {
      log('\n⚠️  .env file not found!', 'yellow');
      log('   Copy .env.example to .env and add your API keys', 'yellow');
      log('   Then run this script again', 'yellow');
      process.exit(1);
    }

    // Check git
    log('\n1️⃣  Checking Git setup...', 'bright');
    try {
      execSync('git status', { stdio: 'ignore' });
    } catch {
      log('   Initializing Git repository...', 'yellow');
      exec('git init', 'Initialize Git');
      exec('git add .', 'Add files to Git');
      exec('git commit -m "Initial commit: AI Gateway"', 'Create initial commit');
    }

    // Check GitHub remote
    try {
      execSync('git remote get-url origin', { stdio: 'ignore' });
    } catch {
      log('\n⚠️  GitHub remote not configured!', 'yellow');
      log('   To add remote, run:', 'yellow');
      log('   git remote add origin https://github.com/YOUR_USER/ai-gateway.git', 'yellow');
      log('   git branch -M main', 'yellow');
      log('   git push -u origin main', 'yellow');
      process.exit(1);
    }

    // Git operations
    log('\n2️⃣  Git operations...', 'bright');
    exec('git add .', 'Stage changes');
    try {
      exec('git commit -m "chore: update AI Gateway"', 'Commit changes');
    } catch {
      log('   (No changes to commit)', 'yellow');
    }
    exec('git push -u origin main', 'Push to GitHub');

    // Vercel deployment
    log('\n3️⃣  Vercel deployment...', 'bright');
    exec('vercel --prod', 'Deploy to Vercel');

    // Success
    log('\n╔════════════════════════════════════════════════════════════╗', 'green');
    log('║                   ✅ DEPLOYMENT SUCCESSFUL! ✅              ║', 'green');
    log('╚════════════════════════════════════════════════════════════╝', 'green');

    log('\n📍 Your AI Gateway is now live!', 'bright');
    log('   Check: https://vercel.com/dashboard', 'blue');

    log('\n📚 Next steps:', 'bright');
    log('   1. Get your Vercel URL', 'blue');
    log('   2. Update GATEWAY_URL in your clients', 'blue');
    log('   3. Share with your projects!', 'blue');

  } catch (error) {
    log('\n❌ Deployment failed!', 'red');
    log(`Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run deployment
deploy();
