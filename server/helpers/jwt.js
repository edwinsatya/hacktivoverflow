const jwt = require('jsonwebtoken');

function getToken(data) {
    console.log(process.env.JWT_SECRET)
    return jwt.sign(data, process.env.JWT_SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    getToken,
    verifyToken
}