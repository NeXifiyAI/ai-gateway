/**
 * Vercel Edge Function - Chat Endpoint
 * POST /api/chat
 */

const AIGateway = require('./gateway');

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { provider, message, model, temperature, maxTokens } = req.body;

    if (!provider || !message) {
      return res.status(400).json({
        error: 'Missing required fields: provider, message'
      });
    }

    const gateway = new AIGateway({
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      GROQ_API_KEY: process.env.GROQ_API_KEY,
      OLLAMA_URL: process.env.OLLAMA_URL,
      HF_API_KEY: process.env.HF_API_KEY,
    });

    const response = await gateway.chat(provider, message, {
      model,
      temperature,
      maxTokens,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error'
    });
  }
}
