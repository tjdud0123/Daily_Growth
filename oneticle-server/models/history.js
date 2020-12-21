const pool = require('../modules/pool');
const ARTICLE_TABLE = 'Article';
const HISTORY_TABLE = 'History';
const NOTE_TABLE = 'Note';

module.exports = {
  // 전체 기록 조회
  getMyHistories: async userIdx => {
    const query = `SELECT sendAt as date, article_id, title as articleTitle, previewText, thumbNailUrl, linkUrl, note_id, content as noteContent, a.createdAt as ArticleCreatedAt,  n.createdAt as noteCreatedAt, isLike
        FROM ((${HISTORY_TABLE} as h
        INNER JOIN ${ARTICLE_TABLE} as a ON h.Article_article_id = a.article_id)
        left JOIN ${NOTE_TABLE} as n ON h.Article_article_id = n.Article_article_id)
        WHERE h.User_user_id = "${userIdx}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('read profile ERROR : ', err);
      throw err;
    }
  },
};
