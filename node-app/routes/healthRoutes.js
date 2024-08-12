const express = require('express');
const { healthCheck } = require('../controllers/healthController');

const router = express.Router();

router.get('/api/v1/health', healthCheck);

module.exports = router;
