let user_info = [];

const notifyUser = (req, res) => {
    user_info = req.body;
    console.log(user_info);
    res.status(200).send(user_info);
};

module.exports = { notifyUser };
