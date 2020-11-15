var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'oneCle',
  });
});

// 계정
router.use('/user', require('./user'));

// 아티클
router.use('/article', require('./article'));

// 노트
router.use('/note', require('./note'));

// 내기록
router.use('/history', require('./history'));

module.exports = router;
