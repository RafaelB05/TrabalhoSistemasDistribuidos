const express = require('express');
const { storeData, getGraphData } = require('../controllers/graphController');

const router = express.Router();

router.post('/api/v1/dados', storeData);
router.get('/api/v1/graficos', getGraphData);

module.exports = router;
