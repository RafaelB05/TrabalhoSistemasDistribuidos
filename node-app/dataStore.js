let user_info;

const setUserInfo = (data) => {
    user_info = data;
};

const getUserInfo = () => {
    return user_info;
};

module.exports = {
    setUserInfo,
    getUserInfo
};