const UserModel = require('../models/user');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');

module.exports = {
  /* 계정 [ 회원가입 ] */
  signup: async (req, res) => {
    const { userName, password, email, job, jobDetail } = req.body;
    if (!userName || !password || !email || !job || !jobDetail) {
      res
        .status(CODE.BAD_REQUEST)
        .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
      return;
    }
    // 사용자 중인 아이디가 있는지 확인
    if (await UserModel.checkUser(email)) {
      res
        .status(CODE.BAD_REQUEST)
        .send(util.fail(CODE.BAD_REQUEST, MSG.ALREADY_ID));
      return;
    }

    const { salt, hashed } = await encrypt.encrypt(password);

    const idx = await UserModel.signup(
      userName,
      email,
      hashed,
      salt,
      job,
      jobDetail,
    );

    if (idx === -1) {
      return res
        .status(CODE.DB_ERROR)
        .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
    }
    res.status(CODE.OK).send(util.success(CODE.NO_CONTENT, MSG.CREATED_USER));
  },

  /* 계정 [ 로그인 ] */
  signin: async (req, res) => {
    const { email, password } = req.body;

    //request data 확인 - 없다면 NUll value 반환
    if (!email || !password) {
      return res
        .status(CODE.BAD_REQUEST)
        .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
    }

    // User의 이메일 계정이 있는지 확인 - 없다면 NO_USER 반납
    const user = await UserModel.getUserById(email);
    if (user[0] === undefined) {
      return res
        .status(CODE.BAD_REQUEST)
        .send(util.fail(CODE.BAD_REQUEST, MSG.NO_USER));
    }
    //req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
    const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
    if (hashed !== user[0].password) {
      return res
        .status(CODE.BAD_REQUEST)
        .send(util.fail(CODE.BAD_REQUEST, MSG.MISS_MATCH_PW));
    }
    //jwt 생성
    const { token, refreshToken } = await jwt.sign(user[0]);

    // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
    res.status(CODE.OK).send(
      util.success(CODE.OK, MSG.LOGIN_SUCCESS, {
        accessToken: token,
      }),
    );
  },

  /* 계정 [ 마이 페이지 정보 조회 ] */
  readProfile: async (req, res) => {
    const userIdx = req.decoded.userId;

    const profileData = await UserModel.readProfile(userIdx);
    const savedArticles = await UserModel.getSavedArticles(userIdx);
    const notes = await UserModel.getMyNotes(userIdx);

    const dataAll = {
      ...profileData[0],
      savedArticles: savedArticles.length,
      notesNum: notes.length,
    };
    res
      .status(CODE.OK)
      .send(util.success(CODE.OK, MSG.READ_PROFILE_SUCCESS, dataAll));
  },
};
