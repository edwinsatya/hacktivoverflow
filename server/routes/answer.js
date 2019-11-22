const express = require('express')
const router = express.Router()
const Answer = require('../controllers/answer')
const {
    authentication,
    authorizationAnswer
} = require('../middleware/auth')
router.use(authentication)
router.get('/', Answer.getanswers)
router.get('/mine', Answer.getMyanswer)
router.get('/mine/:id', Answer.getOneAnswer)
router.post('/create', Answer.createanswer)
router.delete('/:id', Answer.deleteanswer)
router.patch('/upvote/:id', Answer.upvote)
router.patch('/downvote/:id', Answer.downvote)
router.patch('/update/:id', authorizationAnswer, Answer.updateanswer)

module.exports = router;