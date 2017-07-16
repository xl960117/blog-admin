/**
 * Created by Administrator on 2017/2/22.
 */
var express = require('express');
var tagDao = require('../dao/tagDao')

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('this is tag');
});

router.post('/tagAdd', function (req, res, next) {
    tagDao.add(req, res, next);
})

router.post('/tagDelete', function (req, res, next) {
    tagDao.delete(req, res, next);
})

router.get('/taglist', function (req, res, next) {
    tagDao.get(req, res, next);
})

module.exports = router;
