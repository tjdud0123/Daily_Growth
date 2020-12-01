const pool = require('../modules/pool');
const USER_TABLE = 'User';
const HISTORY_TABLE = 'History';
const NOTE_TABLE = 'Note';
const NOTE_EXP = 100;
const ARTICLE_EXP = 50;

const user = {
  signup: async (userName, email, password, salt, job, jobDetail) => {
    const fields = 'userName, email, password, salt, job, jobDetail';
    const questions = `?, ?, ?, ?, ?, ?`;
    const values = [userName, email, password, salt, job, jobDetail];
    const query = `INSERT INTO ${USER_TABLE}(${fields}) VALUES(${questions})`;
    try {
      const result = await pool.queryParamArr(query, values);
      const insertId = result.insertId;
      return insertId;
    } catch (err) {
      console.log('signup ERROR : ', err);
      throw err;
    }
  },
  checkUser: async email => {
    const query = `SELECT * FROM ${USER_TABLE} WHERE email="${email}"`;
    try {
      const result = await pool.queryParam(query);
      return result.length !== 0;
    } catch (err) {
      console.log('checkUser ERROR : ', err);
      throw err;
    }
  },
  getUserById: async email => {
    const query = `SELECT * FROM ${USER_TABLE} WHERE email="${email}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('getUserById ERROR : ', err);
      throw err;
    }
  },
  getUserByIdx: async idx => {
    const query = `SELECT * FROM ${USER_TABLE} WHERE userId="${idx}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('getUserByIdx ERROR : ', err);
      throw err;
    }
  },
  readProfile: async userIdx => {
    const query = `SELECT userName, job, jobDetail, level FROM ${USER_TABLE} WHERE userId="${userIdx}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('read profile ERROR : ', err);
      throw err;
    }
  },
  getSavedArticles: async userIdx => {
    const query = `SELECT User_user_id, Article_article_id FROM ${HISTORY_TABLE} WHERE User_user_id="${userIdx}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('getSavedArticles ERROR : ', err);
      throw err;
    }
  },
  getMyNotes: async userIdx => {
    const query = `SELECT User_user_id, content, createdAt FROM ${NOTE_TABLE} WHERE User_user_id="${userIdx}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('getMyNotes ERROR : ', err);
      throw err;
    }
  },
  updatedMyLevel: async (userIdx, curLevel, type) => {
    const levelInfo = { note: NOTE_EXP, article: ARTICLE_EXP };
    const updatedLevel = curLevel + levelInfo[type];
    const query = `UPDATE ${USER_TABLE} SET level = "${updatedLevel}" WHERE userId ="${userIdx}"`;
    try {
      const result = await pool.queryParam(query);
      const isUpdated = result.insertId;
      return isUpdated;
    } catch (err) {
      if (err.errno == 1062) {
        console.log('updatedMyLevel ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('updatedMyLevel ERROR : ', err);
      throw err;
    }
  },
  getMyLevel: async userIdx => {
    const query = `SELECT level FROM ${USER_TABLE} WHERE UserId="${userIdx}"`;
    try {
      const level = await pool.queryParam(query);
      return level[0] && level[0].level;
    } catch (err) {
      console.log('getMyLevel ERROR : ', err);
      throw err;
    }
  },
};

module.exports = user;
