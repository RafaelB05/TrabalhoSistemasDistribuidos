const express = require('express');
const { notifyUser } = require('../controllers/notifyController');

const router = express.Router();

router.post('/api/v1/notify', notifyUser);

module.exports = router;
