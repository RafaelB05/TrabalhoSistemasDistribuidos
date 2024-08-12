const { setUserInfo } = require('../dataStore');

const notifyUser = (req, res) => {
    const user_info = req.body;
    setUserInfo(user_info);
    console.log(user_info);
    res.status(200).send(user_info);
};

module.exports = { notifyUser };
