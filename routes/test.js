const express = require('express');
const router = express.Router();

// GET /test route to test the server is working properly

router.get('/', (req, res) => {
    res.json({ message: 'Test route is working properly' });
    });

    module.exports = router;