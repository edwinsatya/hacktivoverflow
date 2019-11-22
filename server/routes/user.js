const express = require('express')
const router = express.Router()
const User = require('../controllers/user')
const {
    authentication
} = require('../middleware/auth')

router.post('/signup', User.register);
router.post('/signin', User.login);
router.use(authentication)
router.patch('/addTags', User.addTags)
router.get('/myTags', User.getMyTags)

module.exports = router;