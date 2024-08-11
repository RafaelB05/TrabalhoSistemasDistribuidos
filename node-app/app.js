const express = require('express')

const cors = require('cors')
const app = express()
const porta = 3000

app.use(express.json())
app.use(cors({
    origin: '*'
}))

let titulos_stored = []

app.get('/', (req,res) => {
    res.send("UP")
})

app.post('/api/v1/dados', (req,res) => {
    const titulos = req.body
    titulos_stored.push(titulos)
    res.status(200).json({ message: 'Lista de objetos recebida com sucesso!' });
})

app.get('/api/v1/graficos',(req,res) => {
    res.status(200).send(titulos_stored)

})

app.listen(porta, () => {
    console.log(`App escutando na porta ${porta}`)
})