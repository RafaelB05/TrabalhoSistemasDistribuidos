let titulos_stored;

const storeData = (req, res) => {
    const titulos = req.body;
    titulos_stored = titulos;
    res.status(200).json({ message: 'Lista de objetos recebida com sucesso!' });
};

const getGraphData = (req, res) => {
    res.status(200).send(titulos_stored);
};

module.exports = { storeData, getGraphData };
