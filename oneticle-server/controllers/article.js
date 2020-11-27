const ArticleModel = require('../models/article');
const UserModel = require('../models/user');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const SLICE_NUMBER = 5;

module.exports = {
  // 오늘의 아티클 받아보기
  getTodayArticles: async (req, res) => {
    const userIdx = req.decoded.userId;
    const job = req.decoded.job;
    const jobDetail = req.decoded.jobDetail;

    const fitArticles = await ArticleModel.getFitArticles(job, jobDetail);
    const savedArticles = await UserModel.getSavedArticles(userIdx);
    const savedIndexs = savedArticles.map(
      article => article.Article_article_id,
    );

    const todayArticles = fitArticles
      .filter(article => !savedIndexs.includes(article.article_id))
      .slice(0, SLICE_NUMBER);

    // 성공
    res
      .status(CODE.OK)
      .send(util.success(CODE.OK, MSG.READ_TODAY_ARTICLES, todayArticles));
  },
  // 아티클 저장
  saveArticle: async (req, res) => {
    const userIdx = req.decoded.userId;
    const articleIdx = req.params.aid;
    const sendId = await ArticleModel.saveArticle(userIdx, articleIdx);

    if (sendId === -1) {
      return res
        .status(CODE.DB_ERROR)
        .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
    } else {
      res.status(CODE.OK).send(util.success(CODE.NO_CONTENT, MSG.SAVE_ARTICLE));
    }
  },
  // 아티클 좋아요
  likeArticle: async (req, res) => {
    const userIdx = req.decoded.userId;
    const articleIdx = req.params.aid;
    const likeId = await ArticleModel.likeArticle(userIdx, articleIdx);

    if (likeId === -1) {
      return res
        .status(CODE.DB_ERROR)
        .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
    } else {
      res.status(CODE.OK).send(util.success(CODE.NO_CONTENT, MSG.LIKE_ARTICLE));
    }
  },
  // 아티클 좋아요 취소
  dislikeArticle: async (req, res) => {
    const userIdx = req.decoded.userId;
    const articleIdx = req.params.aid;
    const dislikeId = await ArticleModel.dislikeArticle(userIdx, articleIdx);

    if (dislikeId === -1) {
      return res
        .status(CODE.DB_ERROR)
        .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
    } else {
      res
        .status(CODE.OK)
        .send(util.success(CODE.NO_CONTENT, MSG.DISLIKE_ARTICLE));
    }
  },
};
