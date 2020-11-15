const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const AuthMiddleware = require('../middlewares/auth');

//회원가입
router.post('/signup', UserController.signup);

//로그인
router.post('/signin', UserController.signin);

// 마이 페이지 정보 조회
router.get('/', AuthMiddleware.checkToken, UserController.readProfile);

module.exports = router;
