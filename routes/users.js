var express = require('express');
var userDao = require('../dao/userDao')

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is users');
});

// 增加用户
router.post('/add', function(req, res, next) {
  userDao.add(req, res, next);
});

// 更新用户
router.post('/edit', function(req, res, next) {
    userDao.edit(req, res, next);
});

// 获取用户列表
router.get('/list', function (req, res, next) {
  userDao.get(req, res, next);
})

// 获取详情
router.post('/detail', function(req, res, next) {
  userDao.detail(req, res, next);
});

// 删除用户
router.post('/delete', function(req, res, next) {
  userDao.delete(req, res, next);
});

// 登录
router.post('/login', function (req, res, next) {
  userDao.login(req, res, next);
})

module.exports = router;
