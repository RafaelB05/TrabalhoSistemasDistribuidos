const express = require('express');
const path = require('path');
const cors = require('cors');
const graphRoutes = require('./routes/graphRoutes');
const notifyRoutes = require('./routes/notifyRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();
const porta = 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use(express.static(path.join(__dirname, 'grafico')));
app.use(express.static(path.join(__dirname, 'notificar-usuario')));
app.use(graphRoutes);
app.use(notifyRoutes);
app.use(healthRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'grafico', 'index.html'));
});

app.get('/notificar', (req, res) => {
    res.sendFile(path.join(__dirname, 'notificar-usuario', 'index.html'));
});

app.listen(porta, () => {
    console.log(`App escutando na porta ${porta}`);
});