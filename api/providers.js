/**
 * Vercel Edge Function - Providers Endpoint
 * GET /api/providers
 * Returns all available providers with their models
 */

const AIGateway = require('./gateway');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const gateway = new AIGateway({
      OLLAMA_URL: process.env.OLLAMA_URL,
    });

    const providers = [
      'gemini',
      'groq',
      'openai',
      'claude',
      'ollama',
      'huggingface'
    ];

    const allProviders = {};

    for (const provider of providers) {
      try {
        const models = await gateway.listModels(provider);
        allProviders[provider] = models;
      } catch (error) {
        allProviders[provider] = {
          provider,
          error: error.message,
          models: []
        };
      }
    }

    return res.status(200).json({
      status: 'ok',
      availableProviders: providers,
      details: allProviders,
      usage: 'POST /api/chat with provider and message'
    });
  } catch (error) {
    console.error('Providers endpoint error:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error'
    });
  }
}
