const ArticleModel = require('../models/article');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');

module.exports = {
  // 오늘의 아티클 받아보기
  getTodayArticles: async (req, res) => {},
  // 아티클 저장
  saveArticle: async (req, res) => {},
  // 아티클 좋아요
  likeArticle: async (req, res) => {},
  // 아티클 좋아요 취소
  dislikeArticle: async (req, res) => {},
};
