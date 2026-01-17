#!/usr/bin/env node

/**
 * Quick Start Guide
 * Shows all available commands and how to use them
 */

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

log('\n', 'bright');
log('╔════════════════════════════════════════════════════════════════════════╗', 'cyan');
log('║                                                                        ║', 'cyan');
log('║           🚀 UNIVERSAL AI GATEWAY - QUICK START GUIDE 🚀             ║', 'cyan');
log('║                                                                        ║', 'cyan');
log('║              One API for all AI services (Gemini, OpenAI, etc.)      ║', 'cyan');
log('║                                                                        ║', 'cyan');
log('╚════════════════════════════════════════════════════════════════════════╝', 'cyan');

log('\n📋 SETUP', 'bright');
log('════════════════════════════════════════════════════════════════════════');

log('\n1️⃣  Install Dependencies:', 'blue');
log('   npm install', 'green');

log('\n2️⃣  Configure Environment:', 'blue');
log('   cp .env.example .env', 'green');
log('   Edit .env and add your API keys', 'yellow');

log('\n\n🔑 REQUIRED API KEYS', 'bright');
log('════════════════════════════════════════════════════════════════════════');

const providers = [
  { name: 'Gemini (Google)', url: 'https://ai.google.dev', free: '✅' },
  { name: 'OpenAI (ChatGPT)', url: 'https://platform.openai.com', free: '💰' },
  { name: 'Claude (Anthropic)', url: 'https://console.anthropic.com', free: '💰' },
  { name: 'Groq', url: 'https://console.groq.com', free: '✅' },
  { name: 'HuggingFace', url: 'https://huggingface.co/settings/tokens', free: '✅' },
  { name: 'Ollama (Local)', url: 'https://ollama.ai', free: '✅' },
];

providers.forEach(p => {
  log(`\n${p.free} ${p.name}`, 'yellow');
  log(`   ${p.url}`, 'cyan');
});

log('\n\n🚀 RUN LOCALLY', 'bright');
log('════════════════════════════════════════════════════════════════════════');

log('\nOption A: Docker (Recommended)', 'blue');
log('   docker-compose -f docker/docker-compose.yml up -d', 'green');
log('   Gateway: http://localhost:3000', 'cyan');
log('   Open WebUI: http://localhost:3001', 'cyan');

log('\nOption B: Manual', 'blue');
log('   npm run dev', 'green');
log('   http://localhost:3000', 'cyan');

log('\n\n💻 USAGE EXAMPLES', 'bright');
log('════════════════════════════════════════════════════════════════════════');

log('\n🐍 Python:', 'blue');
log(`   from clients.ai_gateway_client import AIGatewayClient
   client = AIGatewayClient('http://localhost:3000')
   response = client.chat('gemini', 'Hello!')
   print(response['message'])`, 'green');

log('\n🔗 JavaScript:', 'blue');
log(`   const AIGatewayClient = require('./clients/AIGatewayClient');
   const client = new AIGatewayClient('http://localhost:3000');
   const response = await client.chat('gemini', 'Hello!');
   console.log(response.message);`, 'green');

log('\n📡 cURL:', 'blue');
log(`   curl -X POST http://localhost:3000/api/chat \\
     -H "Content-Type: application/json" \\
     -d '{"provider":"gemini","message":"Hello!"}'`, 'green');

log('\n\n🌐 ENDPOINTS', 'bright');
log('════════════════════════════════════════════════════════════════════════');

log('\nPOST /api/chat', 'blue');
log('   Send message to any provider');

log('\nGET /api/models?provider=gemini', 'blue');
log('   List available models');

log('\nGET /api/health', 'blue');
log('   Check gateway health');

log('\n\n⚡ PROVIDERS SUPPORTED', 'bright');
log('════════════════════════════════════════════════════════════════════════');

log('\n✅ Gemini (gemini-1.5-pro) - FREE', 'green');
log('✅ Groq (mixtral-8x7b-32768) - FREE & FAST', 'green');
log('✅ Ollama (mistral) - FREE & LOCAL', 'green');
log('💰 OpenAI (gpt-4-turbo) - PAID', 'yellow');
log('💰 Claude (claude-3-opus) - PAID', 'yellow');
log('✅ HuggingFace (Llama-2) - FREE', 'green');

log('\n\n📦 DEPLOY TO VERCEL', 'bright');
log('════════════════════════════════════════════════════════════════════════');

log('\nAutomatic (recommended):', 'blue');
log('   node deploy.js', 'green');
log('   (Pushes to GitHub & deploys to Vercel)', 'cyan');

log('\nManual:', 'blue');
log('   1. Push to GitHub: git push origin main', 'green');
log('   2. Connect at https://vercel.com/dashboard', 'green');
log('   3. Add environment variables', 'green');
log('   4. Deploy!', 'green');

log('\n\n📚 DOCUMENTATION', 'bright');
log('════════════════════════════════════════════════════════════════════════');

log('\n📖 Full README:', 'blue');
log('   cat README.md', 'green');

log('\n🐳 Docker setup:', 'blue');
log('   docker/docker-compose.yml', 'green');

log('\n🐍 Python client:', 'blue');
log('   clients/ai_gateway_client.py', 'green');

log('\n🔗 JavaScript client:', 'blue');
log('   clients/AIGatewayClient.js', 'green');

log('\n\n🆘 TROUBLESHOOTING', 'bright');
log('════════════════════════════════════════════════════════════════════════');

log('\n❌ "Cannot connect to gateway"', 'red');
log('   ✅ Is the gateway running? (npm run dev or docker-compose up)', 'green');
log('   ✅ Check PORT 3000 is not in use', 'green');

log('\n❌ "Provider not configured"', 'red');
log('   ✅ Add API key to .env', 'green');
log('   ✅ Restart gateway', 'green');

log('\n❌ "Ollama connection error"', 'red');
log('   ✅ Is Ollama running? (docker-compose up)', 'green');
log('   ✅ Check OLLAMA_URL in .env', 'green');

log('\n\n✨ YOU\'RE ALL SET!', 'bright');
log('════════════════════════════════════════════════════════════════════════');

log('\n🎯 Next steps:', 'cyan');
log('   1. npm install', 'yellow');
log('   2. cp .env.example .env (add your API keys)', 'yellow');
log('   3. npm run dev (or docker-compose up)', 'yellow');
log('   4. Visit http://localhost:3000/api/health', 'yellow');
log('   5. Start using the gateway! 🚀', 'yellow');

log('\n💡 Pro tips:', 'cyan');
log('   • Use Gemini or Groq for FREE unlimited usage', 'yellow');
log('   • Use Ollama for completely LOCAL models (no API key needed)', 'yellow');
log('   • Mix providers for the best results', 'yellow');

log('\n📞 Need help?', 'cyan');
log('   GitHub: https://github.com/NeXifiyAI/ai-gateway', 'blue');
log('   Issues: https://github.com/NeXifiyAI/ai-gateway/issues', 'blue');

log('\n\n');
