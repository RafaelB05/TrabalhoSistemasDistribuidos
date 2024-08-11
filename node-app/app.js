const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const porta = 3000

app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use(express.static(path.join(__dirname, 'inde.html')));

let titulos_stored

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});



app.post('/api/v1/dados', (req,res) => {
    const titulos = req.body
    titulos_stored = titulos
    res.status(200).json({ message: 'Lista de objetos recebida com sucesso!' });
})

app.get('/api/v1/graficos',(req,res) => {
    res.status(200).send(titulos_stored)
})

app.get('/api/v1/healt', (req, res) => {
    res.status(200).send('UP')
})


app.listen(porta, () => {
    console.log(`App escutando na porta ${porta}`)
})