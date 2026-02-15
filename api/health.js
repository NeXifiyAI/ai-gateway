const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    const deepSeekApiKey = process.env.DEEPSEEK_API_KEY;
    
    const status = {
        providerConfig: {
            DEEPSEEK_API_KEY: !!deepSeekApiKey // returns true if key exists
        }
    };

    res.status(200).json(status);
});

module.exports = router;