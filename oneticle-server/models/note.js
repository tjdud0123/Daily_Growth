const pool = require('../modules/pool');
const NOTE_TABLE = 'Note';

const note = {
  createMyNote: async (content, userIdx, articleIdx) => {
    const fields = 'content, User_user_id, Article_article_id';
    const questions = `?, ?, ?`;
    const values = [content, userIdx, articleIdx];
    const query = `INSERT INTO ${NOTE_TABLE}(${fields}) VALUES(${questions})`;
    try {
      const result = await pool.queryParamArr(query, values);
      const isCreated = result.insertId;
      return isCreated;
    } catch (err) {
      if (err.errno == 1062) {
        console.log('createMyNote ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('createMyNote ERROR : ', err);
      throw err;
    }
  },

  updateMyNote: async (content, noteIdx) => {
    const query = `UPDATE ${NOTE_TABLE} SET content = "${content}" WHERE note_id ="${noteIdx}"`;
    try {
      const result = await pool.queryParam(query);
      const isUpdated = result.insertId;
      return isUpdated;
    } catch (err) {
      if (err.errno == 1062) {
        console.log('updateMyNote ERROR : ', err.errno, err.code);
        return -1;
      }
      console.log('updateMyNote ERROR : ', err);
      throw err;
    }
  },
};

module.exports = note;
