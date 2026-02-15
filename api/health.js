const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    const healthCheck = {
        DEEPSEEK_API_KEY: checkEnvVar(process.env.DEEPSEEK_API_KEY),
        GEMINI_API_KEY: checkEnvVar(process.env.GEMINI_API_KEY),
        OPENAI_API_KEY: checkEnvVar(process.env.OPENAI_API_KEY),
        ANTHROPIC_API_KEY: checkEnvVar(process.env.ANTHROPIC_API_KEY),
        GROQ_API_KEY: checkEnvVar(process.env.GROQ_API_KEY),
        HF_API_KEY: checkEnvVar(process.env.HF_API_KEY),
        OLLAMA_URL: checkEnvVar(process.env.OLLAMA_URL)
    };

    res.status(200).json(healthCheck);
});

function checkEnvVar(variable) {
    return variable ? 'UP' : 'DOWN';
}

module.exports = router;
