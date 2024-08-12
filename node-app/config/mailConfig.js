const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'trabalhosdrafael@gmail.com',
        pass: 'okbb vkhp rpvd dmgp'
    }
});

module.exports = transporter;
