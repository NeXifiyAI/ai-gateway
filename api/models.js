/**
 * Vercel Edge Function - Models Endpoint
 * GET /api/models?provider=gemini
 */

const AIGateway = require('./gateway');

export default async function handler(req, res) {
  // CORS Headers
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
    const { provider } = req.query;

    if (!provider) {
      return res.status(400).json({
        error: 'Missing required parameter: provider',
        availableProviders: [
          'gemini',
          'openai',
          'claude',
          'groq',
          'ollama',
          'huggingface'
        ]
      });
    }

    const gateway = new AIGateway({
      OLLAMA_URL: process.env.OLLAMA_URL,
    });

    const models = await gateway.listModels(provider);

    return res.status(200).json(models);
  } catch (error) {
    console.error('Models endpoint error:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error'
    });
  }
}
