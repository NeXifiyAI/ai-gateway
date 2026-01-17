/**
 * AI Gateway Router - Universal interface for all AI services
 * Supports: Gemini, OpenAI, Claude, Groq, Ollama, HuggingFace
 */

const axios = require('axios');

class AIGateway {
  constructor(apiKeys = {}) {
    this.apiKeys = {
      gemini: apiKeys.GEMINI_API_KEY || process.env.GEMINI_API_KEY,
      openai: apiKeys.OPENAI_API_KEY || process.env.OPENAI_API_KEY,
      anthropic: apiKeys.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY,
      groq: apiKeys.GROQ_API_KEY || process.env.GROQ_API_KEY,
      hf: apiKeys.HF_API_KEY || process.env.HF_API_KEY,
    };
    this.ollamaUrl = apiKeys.OLLAMA_URL || process.env.OLLAMA_URL || 'http://localhost:11434';
  }

  /**
   * Universal chat endpoint
   * @param {string} provider - 'gemini' | 'openai' | 'claude' | 'groq' | 'ollama' | 'local'
   * @param {string} message - User message
   * @param {object} options - Provider-specific options
   */
  async chat(provider, message, options = {}) {
    const model = options.model || this.getDefaultModel(provider);
    
    switch (provider.toLowerCase()) {
      case 'gemini':
        return this.chatGemini(message, model, options);
      case 'openai':
        return this.chatOpenAI(message, model, options);
      case 'claude':
      case 'anthropic':
        return this.chatClaude(message, model, options);
      case 'groq':
        return this.chatGroq(message, model, options);
      case 'ollama':
      case 'local':
        return this.chatOllama(message, model, options);
      case 'hf':
      case 'huggingface':
        return this.chatHuggingFace(message, model, options);
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }

  /**
   * Get available models for each provider
   */
  async listModels(provider) {
    switch (provider.toLowerCase()) {
      case 'gemini':
        return {
          provider: 'gemini',
          models: [
            'gemini-1.5-pro',
            'gemini-1.5-flash',
            'gemini-1.0-pro',
            'gemini-1.0-pro-vision'
          ]
        };
      case 'openai':
        return {
          provider: 'openai',
          models: [
            'gpt-4-turbo',
            'gpt-4',
            'gpt-3.5-turbo',
            'gpt-4-vision'
          ]
        };
      case 'claude':
      case 'anthropic':
        return {
          provider: 'claude',
          models: [
            'claude-3-opus',
            'claude-3-sonnet',
            'claude-3-haiku',
            'claude-2.1',
            'claude-instant-1.2'
          ]
        };
      case 'groq':
        return {
          provider: 'groq',
          models: [
            'mixtral-8x7b-32768',
            'llama2-70b-4096',
            'gemma-7b-it'
          ]
        };
      case 'ollama':
      case 'local':
        return this.listOllamaModels();
      case 'hf':
        return {
          provider: 'huggingface',
          models: [
            'meta-llama/Llama-2-7b-hf',
            'meta-llama/Llama-2-13b-hf',
            'meta-llama/Llama-2-70b-hf',
            'mistralai/Mistral-7B-Instruct-v0.1'
          ]
        };
      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  }

  // =====================================================
  // PROVIDER IMPLEMENTATIONS
  // =====================================================

  async chatGemini(message, model, options) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKeys.gemini}`,
        {
          contents: [{
            parts: [{
              text: message
            }]
          }],
          generationConfig: {
            temperature: options.temperature || 0.7,
            maxOutputTokens: options.maxTokens || 1024,
          }
        }
      );

      return {
        provider: 'gemini',
        model,
        message: response.data.candidates[0].content.parts[0].text,
        usage: {
          inputTokens: response.data.usageMetadata?.promptTokenCount,
          outputTokens: response.data.usageMetadata?.candidatesTokenCount,
        }
      };
    } catch (error) {
      throw new Error(`Gemini API error: ${error.message}`);
    }
  }

  async chatOpenAI(message, model, options) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model,
          messages: [{
            role: 'user',
            content: message
          }],
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 1024,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKeys.openai}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        provider: 'openai',
        model,
        message: response.data.choices[0].message.content,
        usage: response.data.usage
      };
    } catch (error) {
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }

  async chatClaude(message, model, options) {
    try {
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model,
          max_tokens: options.maxTokens || 1024,
          messages: [{
            role: 'user',
            content: message
          }],
          temperature: options.temperature || 0.7,
        },
        {
          headers: {
            'x-api-key': this.apiKeys.anthropic,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        provider: 'claude',
        model,
        message: response.data.content[0].text,
        usage: response.data.usage
      };
    } catch (error) {
      throw new Error(`Claude API error: ${error.message}`);
    }
  }

  async chatGroq(message, model, options) {
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model,
          messages: [{
            role: 'user',
            content: message
          }],
          temperature: options.temperature || 0.7,
          max_tokens: options.maxTokens || 1024,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKeys.groq}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        provider: 'groq',
        model,
        message: response.data.choices[0].message.content,
        usage: response.data.usage
      };
    } catch (error) {
      throw new Error(`Groq API error: ${error.message}`);
    }
  }

  async chatOllama(message, model, options) {
    try {
      const response = await axios.post(
        `${this.ollamaUrl}/api/generate`,
        {
          model,
          prompt: message,
          stream: false,
          temperature: options.temperature || 0.7,
        }
      );

      return {
        provider: 'ollama',
        model,
        message: response.data.response,
        usage: {
          promptTokens: response.data.prompt_eval_count,
          completionTokens: response.data.eval_count,
        }
      };
    } catch (error) {
      throw new Error(`Ollama API error: ${error.message}`);
    }
  }

  async chatHuggingFace(message, model, options) {
    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          inputs: message,
          parameters: {
            temperature: options.temperature || 0.7,
            max_length: options.maxTokens || 512,
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKeys.hf}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        provider: 'huggingface',
        model,
        message: response.data[0]?.generated_text || response.data[0]?.summary_text,
        usage: { tokens: 0 }
      };
    } catch (error) {
      throw new Error(`HuggingFace API error: ${error.message}`);
    }
  }

  async listOllamaModels() {
    try {
      const response = await axios.get(`${this.ollamaUrl}/api/tags`);
      return {
        provider: 'ollama',
        models: response.data.models.map(m => m.name)
      };
    } catch (error) {
      return {
        provider: 'ollama',
        models: ['llama2', 'mistral', 'neural-chat'],
        error: 'Could not connect to Ollama, returning defaults'
      };
    }
  }

  getDefaultModel(provider) {
    const defaults = {
      gemini: 'gemini-1.5-pro',
      openai: 'gpt-4-turbo',
      claude: 'claude-3-sonnet',
      anthropic: 'claude-3-sonnet',
      groq: 'mixtral-8x7b-32768',
      ollama: 'mistral',
      local: 'mistral',
      hf: 'meta-llama/Llama-2-7b-hf'
    };
    return defaults[provider.toLowerCase()] || 'unknown';
  }
}

module.exports = AIGateway;
