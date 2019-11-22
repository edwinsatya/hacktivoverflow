const question = require('../models/question')
const answer = require('../models/answer')
const jwt = require('../helpers/jwt');

function authentication(req, res, next) {
    try {
        let decoded = jwt.verifyToken(req.headers.token);
        req.decoded = decoded;
        next()
    } catch (err) {
        next(err);
    }
};

function authorizationAnswer(req, res, next) {
    let UserId = req.decoded.id
    let {
        id
    } = req.params
    answer.find({
            UserId,
            _id: id
        })
        .then(data => {
            if (data.length == 0) {
                res.status(401).json({
                    message: 'You are not authorized'
                })
            } else {
                next()
            }
        }).catch(next)
}

function authorizationQuestion(req, res, next) {
    let UserId = req.decoded.id
    let {
        id
    } = req.params
    question.find({
            UserId,
            _id: id
        })
        .then(data => {
            if (data.length == 0) {
                res.status(401).json({
                    message: 'You are not authorized'
                })
            } else {
                next()
            }
        }).catch(next)

}

module.exports = {
    authentication,
    authorizationAnswer,
    authorizationQuestion
}