"""
AI Gateway Python Client
Universal interface for all AI providers
"""

import requests
import os
from typing import Optional, Dict, Any
from dotenv import load_dotenv

load_dotenv()

class AIGatewayClient:
    def __init__(self, base_url: str = None, api_keys: Dict[str, str] = None):
        """
        Initialize AI Gateway Client
        
        Args:
            base_url: Gateway URL (default: http://localhost:3000 or VERCEL_URL)
            api_keys: Dict with provider API keys
        """
        self.base_url = base_url or os.getenv('GATEWAY_URL') or 'http://localhost:3000'
        self.base_url = self.base_url.rstrip('/')
        self.api_keys = api_keys or {}
        
    def chat(
        self,
        provider: str,
        message: str,
        model: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: Optional[int] = None,
    ) -> Dict[str, Any]:
        """
        Send a chat message to any AI provider
        
        Args:
            provider: 'gemini', 'openai', 'claude', 'groq', 'ollama', 'huggingface'
            message: User message
            model: Model name (optional, uses default if not provided)
            temperature: Temperature (0.0 - 1.0)
            max_tokens: Maximum tokens in response
            
        Returns:
            Response dict with provider, model, message, usage
            
        Example:
            client = AIGatewayClient()
            response = client.chat('gemini', 'Hello!')
            print(response['message'])
        """
        try:
            payload = {
                'provider': provider,
                'message': message,
                'temperature': temperature,
            }
            
            if model:
                payload['model'] = model
            if max_tokens:
                payload['maxTokens'] = max_tokens
            
            response = requests.post(
                f'{self.base_url}/api/chat',
                json=payload,
                timeout=30
            )
            
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.ConnectionError:
            return {'error': f'Cannot connect to {self.base_url}. Is the gateway running?'}
        except Exception as e:
            return {'error': str(e)}
    
    def list_models(self, provider: str) -> Dict[str, Any]:
        """
        Get available models for a provider
        
        Args:
            provider: 'gemini', 'openai', 'claude', 'groq', 'ollama', 'huggingface'
            
        Returns:
            Dict with provider and list of models
            
        Example:
            client = AIGatewayClient()
            models = client.list_models('gemini')
            print(models['models'])
        """
        try:
            response = requests.get(
                f'{self.base_url}/api/models',
                params={'provider': provider},
                timeout=10
            )
            
            response.raise_for_status()
            return response.json()
            
        except Exception as e:
            return {'error': str(e)}
    
    def health_check(self) -> Dict[str, Any]:
        """
        Check gateway health and provider status
        
        Example:
            client = AIGatewayClient()
            health = client.health_check()
            print(health['status'])  # 'ok'
        """
        try:
            response = requests.get(
                f'{self.base_url}/api/health',
                timeout=5
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            return {'error': str(e)}
    
    # Convenience methods for each provider
    
    def chat_gemini(self, message: str, **kwargs) -> Dict[str, Any]:
        """Chat with Gemini (Google)"""
        return self.chat('gemini', message, **kwargs)
    
    def chat_openai(self, message: str, **kwargs) -> Dict[str, Any]:
        """Chat with OpenAI (ChatGPT)"""
        return self.chat('openai', message, **kwargs)
    
    def chat_claude(self, message: str, **kwargs) -> Dict[str, Any]:
        """Chat with Claude (Anthropic)"""
        return self.chat('claude', message, **kwargs)
    
    def chat_groq(self, message: str, **kwargs) -> Dict[str, Any]:
        """Chat with Groq (fast inference)"""
        return self.chat('groq', message, **kwargs)
    
    def chat_ollama(self, message: str, **kwargs) -> Dict[str, Any]:
        """Chat with Ollama (local)"""
        return self.chat('ollama', message, **kwargs)
    
    def chat_huggingface(self, message: str, **kwargs) -> Dict[str, Any]:
        """Chat with HuggingFace"""
        return self.chat('huggingface', message, **kwargs)


# Example usage
if __name__ == '__main__':
    # Local development
    client = AIGatewayClient('http://localhost:3000')
    
    # Check health
    print('🏥 Health Check:')
    print(client.health_check())
    print()
    
    # Chat with different providers
    providers = ['gemini', 'groq', 'ollama']
    
    for provider in providers:
        print(f'💬 Chat with {provider.upper()}:')
        response = client.chat(provider, 'What is the meaning of life?')
        if 'error' not in response:
            print(f'Response: {response.get("message", "No message")}')
            print(f'Model: {response.get("model")}')
        else:
            print(f'Error: {response.get("error")}')
        print()
