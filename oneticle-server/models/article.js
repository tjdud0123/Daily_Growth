const pool = require('../modules/pool');
const ARTICLE_TABLE = 'Article';
const HISTORY_TABLE = 'History';
const CATEGORY_TABLE = 'Category';

const article = {
  // 아티클 저장
  saveArticle: async (userIdx, articleIdx) => {
    const fields = 'User_user_id, Article_article_id';
    const questions = `?, ?`;
    const values = [userIdx, articleIdx];
    const query = `INSERT INTO ${HISTORY_TABLE}(${fields}) VALUES(${questions})`;
    try {
      const result = await pool.queryParamArr(query, values);
      const sendId = result.insertId;
      return sendId;
    } catch (err) {
      if (err.errno == 1062) {
        console.log('saveArticle ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('saveArticle ERROR : ', err);
      throw err;
    }
  },
  // 아티클 좋아요
  likeArticle: async (userIdx, articleIdx) => {
    const query = `UPDATE ${HISTORY_TABLE} SET isLike = "1" WHERE User_user_id="${userIdx}" AND Article_article_id="${articleIdx}"`;
    try {
      const result = await pool.queryParamArr(query);
      const likeId = result.insertId;
      return likeId;
    } catch (err) {
      if (err.errno == 1062) {
        console.log('likeArticle ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('likeArticle ERROR : ', err);
      throw err;
    }
  },
  // 아티클 좋아요 취소
  dislikeArticle: async (userIdx, articleIdx) => {
    const query = `UPDATE ${HISTORY_TABLE} SET isLike = "0" WHERE User_user_id="${userIdx}" AND Article_article_id="${articleIdx}"`;
    try {
      const result = await pool.queryParam(query);
      const insertId = result.insertId;
      return insertId;
    } catch (err) {
      console.log('dislikeArticle ERROR : ', err);
      throw err;
    }
  },
  //오늘의 아티클 받아보기
  getFitArticles: async (job, jobDetail) => {
    const query = `SELECT DISTINCT article_id, title, previewText, thumbNailUrl, linkUrl, createdAt FROM ${CATEGORY_TABLE} INNER JOIN ${ARTICLE_TABLE} WHERE Article_article_id = article_id and (category="${job}" or category="${jobDetail}") ORDER BY RAND()`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('read profile ERROR : ', err);
      throw err;
    }
  },
};

module.exports = article;
