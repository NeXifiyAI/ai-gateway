/**
 * Health Check Endpoint
 * GET /api/health
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    providers: [
      { name: 'Gemini', status: process.env.GEMINI_API_KEY ? 'configured' : 'not-configured' },
      { name: 'OpenAI', status: process.env.OPENAI_API_KEY ? 'configured' : 'not-configured' },
      { name: 'Claude', status: process.env.ANTHROPIC_API_KEY ? 'configured' : 'not-configured' },
      { name: 'Groq', status: process.env.GROQ_API_KEY ? 'configured' : 'not-configured' },
      { name: 'Ollama', status: process.env.OLLAMA_URL ? 'configured' : 'not-configured' },
      { name: 'HuggingFace', status: process.env.HF_API_KEY ? 'configured' : 'not-configured' },
    ],
    version: '1.0.0'
  });
}
