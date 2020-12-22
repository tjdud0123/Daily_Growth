const NoteModel = require('../models/note');
const UserModel = require('../models/user');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');

module.exports = {
  // 노트 추가
  createNote: async (req, res) => {
    const { content } = req.body;
    const userIdx = req.decoded.userId;
    const articleIdx = req.params.aid;
    const type = 'note';
    const curLevel = await UserModel.getMyLevel(userIdx);
    // 노트생성
    const isCreated = await NoteModel.createMyNote(
      content,
      userIdx,
      articleIdx,
    );
    if (isCreated === -1) {
      return res
        .status(CODE.DB_ERROR)
        .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
    }
    // 레벨 업
    const isLevelUpdated = await UserModel.updatedMyLevel(
      userIdx,
      curLevel,
      type,
    );
    if (isLevelUpdated === -1) {
      return res
        .status(CODE.DB_ERROR)
        .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
    }

    res.status(CODE.OK).send(util.success(CODE.NO_CONTENT, MSG.ADD_NOTE));
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
