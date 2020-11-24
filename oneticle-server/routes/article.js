const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article');
const AuthMiddleware = require('../middlewares/auth');

// 오늘의 아티클 받아보기
router.get(
  '/today',
  AuthMiddleware.checkToken,
  ArticleController.getTodayArticles,
);

// 아티클 저장
router.post('/', AuthMiddleware.checkToken, ArticleController.saveArticle);

// 아티클 좋아요
router.post(
  '/like/:aid',
  AuthMiddleware.checkToken,
  ArticleController.likeArticle,
);

// 아티클 좋아요 취소
router.delete(
  '/like/:aid',
  AuthMiddleware.checkToken,
  ArticleController.dislikeArticle,
);

module.exports = router;
