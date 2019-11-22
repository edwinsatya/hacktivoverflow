const express = require('express')
const router = express.Router()
const Question = require('../controllers/question')
const {
    authentication,
    authorizationQuestion
} = require('../middleware/auth')

router.use(authentication)
router.get('/', Question.getQuestions)
router.get('/mine', Question.getMyQuestion)
router.get('/mine/:id', Question.getOneQuestion)
router.post('/create', Question.createQuestion)
router.patch('/update/:id', authorizationQuestion, Question.updateQuestion)
router.delete('/:id', authorizationQuestion, Question.deleteQuestion)
router.patch('/upvote/:id', Question.upvote)
router.patch('/downvote/:id', Question.downvote)
router.patch('/createTags', Question.createTags)
router.get('/tags/:tag', Question.getTagsbyName)

module.exports = router;