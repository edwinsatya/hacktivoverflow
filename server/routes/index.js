const express = require('express')
const router = express.Router()
const answer = require('./answer')
const question = require('./question')
const vote = require('./vote')
const user = require('./user')

router.use('/answer', answer)
router.use('/question', question)
router.use('/vote', vote)
router.use('/user', user)

module.exports = router;