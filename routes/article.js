/**
 * Created by Administrator on 2017/2/22.
 */
var express = require('express');
var articleDao = require('../dao/articleDao')

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('this is article');
});

router.post('/articleAdd', function (req, res, next) {
    articleDao.add(req, res, next);
})

router.post('/articleEdit', function (req, res, next) {
    articleDao.edit(req, res, next);
})

router.post('/articleDetail', function (req, res, next) {
    articleDao.detail(req, res, next);
})

router.post('/articleDelete', function (req, res, next) {
    articleDao.delete(req, res, next);
})

router.get('/articlelist', function (req, res, next) {
    articleDao.get(req, res, next);
})

module.exports = router;
