/**
 * AI Gateway JavaScript Client
 * Universal interface for all AI providers
 */

class AIGatewayClient {
  constructor(baseUrl = null) {
    /**
     * Initialize AI Gateway Client
     * @param {string} baseUrl - Gateway URL (default: http://localhost:3000 or VERCEL_URL)
     */
    this.baseUrl = (baseUrl || process.env.GATEWAY_URL || 'http://localhost:3000').replace(/\/$/, '');
  }

  /**
   * Send a chat message to any AI provider
   * @param {string} provider - 'gemini', 'openai', 'claude', 'groq', 'ollama', 'huggingface'
   * @param {string} message - User message
   * @param {object} options - {model, temperature, maxTokens}
   * @returns {Promise<object>} Response with provider, model, message, usage
   */
  async chat(provider, message, options = {}) {
    try {
      const payload = {
        provider,
        message,
        temperature: options.temperature || 0.7,
      };

      if (options.model) payload.model = options.model;
      if (options.maxTokens) payload.maxTokens = options.maxTokens;

      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Get available models for a provider
   * @param {string} provider - Provider name
   * @returns {Promise<object>} Dict with provider and list of models
   */
  async listModels(provider) {
    try {
      const url = new URL(`${this.baseUrl}/api/models`);
      url.searchParams.append('provider', provider);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * Check gateway health and provider status
   * @returns {Promise<object>} Gateway health info
   */
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  }

  // Convenience methods
  async chatGemini(message, options = {}) {
    return this.chat('gemini', message, options);
  }

  async chatOpenAI(message, options = {}) {
    return this.chat('openai', message, options);
  }

  async chatClaude(message, options = {}) {
    return this.chat('claude', message, options);
  }

  async chatGroq(message, options = {}) {
    return this.chat('groq', message, options);
  }

  async chatOllama(message, options = {}) {
    return this.chat('ollama', message, options);
  }

  async chatHuggingFace(message, options = {}) {
    return this.chat('huggingface', message, options);
  }
}

// Export for Node.js and browsers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIGatewayClient;
}

// Example usage (Node.js)
if (require.main === module) {
  (async () => {
    const client = new AIGatewayClient('http://localhost:3000');

    console.log('🏥 Health Check:');
    console.log(await client.healthCheck());
    console.log();

    console.log('💬 Chat with Gemini:');
    const response = await client.chat('gemini', 'What is the meaning of life?');
    if (!response.error) {
      console.log(`Response: ${response.message}`);
      console.log(`Model: ${response.model}`);
    } else {
      console.log(`Error: ${response.error}`);
    }
  })();
}
