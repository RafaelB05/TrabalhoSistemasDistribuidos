const { getUserInfo } = require('../dataStore');
const transporter = require('../config/mailConfig');
let titulos_stored =[];

const storeData = (req, res) => {
    const user = getUserInfo();
    const titulos = req.body;

    if (titulos_stored.length > 0) {
        titulos.forEach(titulo => {
            if(user != null){
                if (user.fundos.includes(titulo.fundo_titulo)) {
                    const storedTitulo = titulos_stored.find(t => t.fundo_titulo === titulo.fundo_titulo, user.variacao);
                    if (storedTitulo) {
                        if (titulo.dy > storedTitulo.dy && user.variacao === 'A') {
                            sendEmail(user.dynamicInput, titulo.fundo_titulo, titulo.dy);
                        }
                        else if(titulo.dy < storedTitulo.dy && user.variacao === 'B'){
                            sendEmail(user.dynamicInput,titulo.fundo_titulo,titulo.dy, user.variacao)
                        }
                        //Linha somente para teste do envio da notificação uma vez que o yeld varia mensalmente
                        //else if(titulo.dy === storedTitulo.dy && user.variacao ==='A'){
                        //    sendEmail(user.dynamicInput,titulo.fundo_titulo,titulo.dy,user.variacao)
                        //}
                    }
                }
            } 
        });
    }

    titulos_stored = titulos;
    res.status(200).json({ message: 'Lista de objetos recebida com sucesso!' });
};

const getGraphData = (req, res) => {
    res.status(200).send(titulos_stored);
};


const sendEmail = (email, fundo_titulo, dy, variacao) => {
    let mailOptions;
    if(variacao === 'A'){
        mailOptions = {
            from: 'trabalhosdrafael@gmail.com',
            to: email,
            subject: `Notificação: Aumento no valor de DY do fundo ${fundo_titulo}`,
            text: `O valor de DY do fundo ${fundo_titulo} aumentou para ${dy}.`
        };
    }
    else{
        mailOptions = {
            from: 'trabalhosdrafael@gmail.com',
            to: email,
            subject: `Notificação: Baixa no valor de DY do fundo ${fundo_titulo}`,
            text: `O valor de DY do fundo ${fundo_titulo} aumentou para ${dy}.`
        };
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar e-mail:', error);
        } else {
            (`E-mail de notificação enviado para ${email}:`, info.response);
        }
    });
};


module.exports = { storeData, getGraphData };
