class ApiGateway {
    constructor() {
        this.deepSeek = new DeepSeek(); // Integrating DeepSeek
        this.defaultModel = this.getDefaultModel();
    }

    async chat(input) {
        // Handle chat cases
        if (input.model === 'deepseek') {
            return this.chatDeepSeek(input);
        }
        // Other model logic...
    }

    async listModels() {
        const models = await this.deepSeek.listModels(); // DeepSeek supported models
        // Additional logic to list other models...
        return models;
    }

    async chatDeepSeek(input) {
        // DeepSeek specific chat implementation
        return await this.deepSeek.chat(input);
    }

    getDefaultModel() {
        // Setting deepseek as default
        return 'deepseek';
    }
}

// Other existing methods
