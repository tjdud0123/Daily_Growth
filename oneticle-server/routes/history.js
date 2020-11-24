const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/history');
const AuthMiddleware = require('../middlewares/auth');

// 전체 기록 조회
router.get(
  '/history',
  AuthMiddleware.checkToken,
  HistoryController.getAllHistories,
);

module.exports = router;
