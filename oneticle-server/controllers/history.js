const HistoryModel = require('../models/history');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');

module.exports = {
  // 전체 기록 조회
  getAllHistories: async (req, res) => {
    const userIdx = req.decoded.userId;
    const myHistories = await HistoryModel.getMyHistories(userIdx);

    // 성공
    res
      .status(CODE.OK)
      .send(util.success(CODE.OK, MSG.READ_ALL_HISTORIES, myHistories));
  },
};
