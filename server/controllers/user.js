const User = require('../models/user');
const {
    hashPassword,
    comparePassword
} = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');
class UserController {
    static register(req, res, next) {
        console.log('masuk register');
        let {
            name,
            email,
            password
        } = req.body;
        password = hashPassword(password);
        User.create({
                name,
                email,
                password
            })
            .then(user => {
                res.status(201).json(user);
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log('masuk login')
        let {
            email,
            password
        } = req.body;
        User.findOne({
                email
            })
            .then(user => {
                if (!user) {
                    console.log('dari user==>', user)
                    next({
                        message: 'Username/Password is wrong!'
                    })
                } else {
                    if (!comparePassword(password, user.password)) {
                        next({
                            message: 'Username/Password is wrong!'
                        });
                    } else {
                        // console.log('ketemu user')
                        const payloadjwt = {
                            id: user._id,
                            email: user.email
                        }
                        let token = jwt.getToken(payloadjwt);
                        res.status(200).json({
                            token,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        })
                    }
                }
            })
            .catch(next);
    }

    static addTags(req, res, next) {
        let {
            tagKu
        } = req.body
        let {
            id
        } = req.decoded

        User.findByIdAndUpdate(id, {
                $set: {
                    myTags: []
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(data => {
                return User.findByIdAndUpdate(id, {
                        $addToSet: {
                            myTags: {
                                $each: tagKu
                            }
                        }
                    }, {
                        new: true,
                        runValidators: true
                    })
                    .then(data => {
                        res.status(200).json({
                            data
                        })
                    })
            }).catch(next)
    }

    static getMyTags(req, res, next) {
        let {
            id
        } = req.decoded
        User.findById(id)
            .then(data => {
                let tags = data.myTags
                res.status(200).json({
                    tags
                })
            }).catch(next)
    }
}

module.exports = UserController;