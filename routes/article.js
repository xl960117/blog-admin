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

router.post('/add', function (req, res, next) {
    articleDao.add(req, res, next);
})

router.post('/edit', function (req, res, next) {
    articleDao.edit(req, res, next);
})

router.post('/detail', function (req, res, next) {
    articleDao.detail(req, res, next);
})

router.post('/delete', function (req, res, next) {
    articleDao.delete(req, res, next);
})

router.get('/list', function (req, res, next) {
    articleDao.get(req, res, next);
})

module.exports = router;
