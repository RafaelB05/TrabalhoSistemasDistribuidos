const healthCheck = (req, res) => {
    res.status(200).send('UP');
};

module.exports = { healthCheck };
