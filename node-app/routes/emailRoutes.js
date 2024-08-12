const express = require('express');
const { sendEmail } = require('../controllers/emailController');

const router = express.Router();

router.get('/sendEmail', sendEmail);

module.exports = router;
