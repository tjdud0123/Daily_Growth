const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/note');
const AuthMiddleware = require('../middlewares/auth');

// 노트 추가
router.post('/:aid', AuthMiddleware.checkToken, NoteController.addNote);

// 노트 내용 수정
router.put('/:nid', AuthMiddleware.checkToken, NoteController.updateNote);

module.exports = router;
