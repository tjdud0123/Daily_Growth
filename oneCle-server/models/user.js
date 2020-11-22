const pool = require('../modules/pool');
const table = 'User';

const user = {
  signup: async (userName, email, password, salt, job, jobDetail) => {
    const fields = 'userName, email, password, salt, job, jobDetail';
    const questions = `?, ?, ?, ?, ?, ?`;
    const values = [userName, email, password, salt, job, jobDetail];
    const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
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
    const query = `SELECT * FROM ${table} WHERE email="${email}"`;
    try {
      const result = await pool.queryParam(query);
      return result.length !== 0;
    } catch (err) {
      console.log('checkUser ERROR : ', err);
      throw err;
    }
  },
  getUserById: async email => {
    const query = `SELECT * FROM ${table} WHERE email="${email}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('getUserById ERROR : ', err);
      throw err;
    }
  },
  getUserByIdx: async idx => {
    const query = `SELECT * FROM ${table} WHERE userId="${idx}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('getUserByIdx ERROR : ', err);
      throw err;
    }
  },
  readProfile: async userIdx => {
    console.log('ss', userIdx);
    // const query = `SELECT userName, job, jobDetail, savedArticles, notesNum FROM ${table} WHERE userId="${userIdx}"`;
    const query = `SELECT userName, job, jobDetail FROM ${table} WHERE userId="${userIdx}"`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log('read profile ERROR : ', err);
      throw err;
    }
  },
};

module.exports = user;
