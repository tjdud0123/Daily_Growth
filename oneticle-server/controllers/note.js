const NoteModel = require('../models/note');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');

module.exports = {
  // 노트 추가
  createNote: async (req, res) => {
    const { content } = req.body;
    const userIdx = req.decoded.userId;
    const articleIdx = req.params.aid;

    const note = await NoteModel.createMyNote(content, userIdx, articleIdx);
    res.status(CODE.OK).send(util.success(CODE.OK, MSG.ADD_NOTE, note[0]));
  },
  // 노트 내용 수정
  updateNote: async (req, res) => {
    const { content } = req.body;
    const noteIdx = req.params.nid;

    const updateId = await NoteModel.updateMyNote(content, noteIdx);
    if (updateId === -1) {
      return res
        .status(CODE.DB_ERROR)
        .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
    } else {
      res.status(CODE.OK).send(util.success(CODE.NO_CONTENT, MSG.UPDATE_NOTE));
    }
  },
};
