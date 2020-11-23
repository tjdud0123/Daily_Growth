const pool = require('../modules/pool');
const USER_TABLE = 'User';
const SEND_TABLE = 'Send';
const NOTE_TABLE = 'Note';

const user = {
  signup: async (userName, email, password, salt, job, jobDetail) => {
    const fields = 'userName, email, password, salt, job, jobDetail';
    const questions = `?, ?, ?, ?, ?, ?`;
    const values = [userName, email, password, salt, job, jobDetail];
    const query = `INSERT INTO ${USER_TABLE}(${fields}) VALUES(${questions})`;
    try {
      const result = await pool.queryParamArr(query, values);
      //console.log(result)
      const insertId = result.insertId;
      //console.log(insertId);
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
    const query = `SELECT userName, job, jobDetail FROM ${USER_TABLE} WHERE userId="${userIdx}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('read profile ERROR : ', err);
      throw err;
    }
  },
  getSavedArticles: async userIdx => {
    const query = `SELECT User_user_id, Article_article_id FROM ${SEND_TABLE} WHERE User_user_id="${userIdx}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('read profile ERROR : ', err);
      throw err;
    }
  },
  getMyNotes: async userIdx => {
    const query = `SELECT User_user_id, content, createdAt FROM ${NOTE_TABLE} WHERE User_user_id="${userIdx}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('read profile ERROR : ', err);
      throw err;
    }
  },
};

module.exports = user;
