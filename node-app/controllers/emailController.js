const transporter = require('../config/mailConfig');

const sendEmail = (req, res) => {
    const mailOptions = {
        from: 'trabalhosdrafael@gmail.com',
        to: 'bruninirafael@gmail.com',
        subject: 'Teste SD',
        text: 'Isto é um teste'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar e-mail:', error);
            res.status(500).send('Erro ao enviar e-mail');
        } else {
            console.log('E-mail enviado:', info.response);
            res.status(200).send('Enviado com sucesso');
        }
    });
};

module.exports = { sendEmail };
