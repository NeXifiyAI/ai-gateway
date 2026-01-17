# Universal AI Gateway - README

## 🚀 What is AI Gateway?

**One API to rule them all!**

A universal gateway that connects to every major AI service in one place:

- ✅ **Gemini** (Google) - Free
- ✅ **OpenAI** (ChatGPT) - Paid
- ✅ **Claude** (Anthropic) - Paid
- ✅ **Groq** (Fast inference) - Free
- ✅ **Ollama** (Local models) - Free
- ✅ **HuggingFace** - Free
- ✅ **And more...**

## 📋 Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/NeXifiyAI/ai-gateway.git
cd ai-gateway

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 2. Add Your API Keys to `.env`

```
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=sk_test_xxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxx
GROQ_API_KEY=gsk_xxxxx
OLLAMA_URL=http://localhost:11434
HF_API_KEY=hf_xxxxx
```

### 3. Run Locally

**Option A: Docker (Recommended)**
```bash
docker-compose -f docker/docker-compose.yml up -d
# Gateway: http://localhost:3000
# Open WebUI: http://localhost:3001
```

**Option B: Manual**
```bash
npm run dev
# Gateway: http://localhost:3000
```

### 4. Deploy to Vercel

```bash
npm run deploy
# Your gateway is now live! 🚀
```

## 💻 API Usage

### Python Client

```python
from clients.ai_gateway_client import AIGatewayClient

# Local
client = AIGatewayClient('http://localhost:3000')

# Or Vercel
client = AIGatewayClient('https://your-gateway.vercel.app')

# Chat
response = client.chat('gemini', 'What is AI?')
print(response['message'])

# List models
models = client.list_models('gemini')
print(models['models'])

# Health check
health = client.health_check()
print(health['status'])
```

### JavaScript Client

```javascript
const AIGatewayClient = require('./clients/AIGatewayClient');

const client = new AIGatewayClient('http://localhost:3000');

// Chat
const response = await client.chat('gemini', 'What is AI?');
console.log(response.message);

// Models
const models = await client.listModels('gemini');
console.log(models.models);

// Health
const health = await client.healthCheck();
console.log(health.status);
```

### cURL

```bash
# Chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "gemini",
    "message": "What is AI?"
  }'

# Models
curl http://localhost:3000/api/models?provider=gemini

# Health
curl http://localhost:3000/api/health
```

## 🌐 Endpoints

### `POST /api/chat`

Send a message to any provider.

**Request:**
```json
{
  "provider": "gemini",
  "message": "What is the meaning of life?",
  "model": "gemini-1.5-pro",
  "temperature": 0.7,
  "maxTokens": 1024
}
```

**Response:**
```json
{
  "provider": "gemini",
  "model": "gemini-1.5-pro",
  "message": "The meaning of life is subjective...",
  "usage": {
    "inputTokens": 5,
    "outputTokens": 50
  }
}
```

### `GET /api/models?provider=gemini`

Get available models for a provider.

**Response:**
```json
{
  "provider": "gemini",
  "models": [
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-1.0-pro"
  ]
}
```

### `GET /api/health`

Check gateway health and provider status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-17T10:30:00Z",
  "providers": [
    {
      "name": "Gemini",
      "status": "configured"
    },
    {
      "name": "OpenAI",
      "status": "not-configured"
    }
  ]
}
```

## 📦 Supported Providers

| Provider | Model | Speed | Cost | Setup |
|----------|-------|-------|------|-------|
| **Gemini** | gemini-1.5-pro | ⚡⚡⚡ | Free | Add API Key |
| **OpenAI** | gpt-4-turbo | ⚡⚡ | Paid | Add API Key |
| **Claude** | claude-3-opus | ⚡⚡⚡ | Paid | Add API Key |
| **Groq** | mixtral-8x7b | ⚡⚡⚡ | Free | Add API Key |
| **Ollama** | mistral | ⚡ | Free | Local |
| **HuggingFace** | Llama-2 | ⚡⚡ | Free | Add API Key |

## 🐳 Docker

### Start Services

```bash
# Start all (Gateway + Ollama + Open WebUI)
docker-compose -f docker/docker-compose.yml up -d

# View logs
docker-compose -f docker/docker-compose.yml logs -f

# Stop all
docker-compose -f docker/docker-compose.yml down
```

### Services

- **Gateway**: http://localhost:3000
- **Open WebUI**: http://localhost:3001
- **Ollama API**: http://localhost:11434

## 🚀 Vercel Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit: AI Gateway"
git push origin main
```

### 2. Deploy to Vercel

```bash
npm run deploy
```

**Or manually on vercel.com:**
1. Connect your GitHub repository
2. Add environment variables
3. Deploy!

### 3. Your Gateway is Live!

```
https://your-project.vercel.app/api/chat
```

## 🔐 Security

- ✅ API keys stored in environment variables
- ✅ CORS enabled (configurable)
- ✅ No keys exposed in logs
- ✅ Rate limiting recommended for production

## 📚 Examples

### React Component

```jsx
import { useState } from 'react';
import AIGatewayClient from './clients/AIGatewayClient';

const client = new AIGatewayClient(process.env.REACT_APP_GATEWAY_URL);

export function ChatComponent() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const result = await client.chat('gemini', message);
    setResponse(result.message);
  };

  return (
    <div>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
      <p>{response}</p>
    </div>
  );
}
```

### FastAPI Integration

```python
from fastapi import FastAPI
from clients.ai_gateway_client import AIGatewayClient

app = FastAPI()
client = AIGatewayClient('https://your-gateway.vercel.app')

@app.post('/ask')
async def ask(question: str, provider: str = 'gemini'):
    response = client.chat(provider, question)
    return response
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run locally with hot reload
npm run dev

# Build
npm run build

# Deploy to production
npm run deploy
```

## 📝 Files

```
ai-gateway/
├── api/
│   ├── gateway.js        # Core routing logic
│   ├── chat.js           # Chat endpoint
│   ├── models.js         # Models endpoint
│   └── health.js         # Health check
├── clients/
│   ├── ai_gateway_client.py    # Python client
│   └── AIGatewayClient.js      # JavaScript client
├── docker/
│   └── docker-compose.yml      # Local development
├── vercel.json           # Vercel config
├── package.json          # Dependencies
├── .env.example          # Environment template
└── README.md             # This file
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

MIT License - see LICENSE file

## 🙋 Support

- 📚 Documentation: See `/docs`
- 🐛 Issues: GitHub Issues
- 💬 Discord: [Community Server]
- 📧 Email: support@nexifiyai.com

---

**Made with ❤️ by NeXifiyAI**

[GitHub](https://github.com/NeXifiyAI/ai-gateway) | [Website](https://nexifiyai.com)
