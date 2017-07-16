/**
 * Created by Administrator on 2017/2/22.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/mysql');
var $util = require('../util/util');
var $sql = require('./articleSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败！'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.body
            connection.query($sql.insert, [param.title, param.author, param.content, param.tag, param.class], function(err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg:'添加成功'
                    };
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    get: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                var replay = ''
                if (result.length) {
                    replay = {
                        code: 200,
                        data: result,
                        msg: '获取成功!'
                    }
                } else {
                    replay = {
                        code: 1,
                        msg: '暂无数据!'
                    }
                }
                jsonWrite(res, replay);
                connection.release();
            });
        });
    },
    detail: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.body
            connection.query($sql.queryById, [param.id], function(err, result) {
                let replay = {
                    code: 200,
                    data: result,
                    msg: '获取成功!'
                }
                jsonWrite(res, replay);
                connection.release();
            });
        });
    },
    edit: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.body
            connection.query($sql.update, [param.title, param.author, param.content, param.tag, param.class, param.id], function(err, result) {
                let replay = {
                    code: 200,
                    msg: '修改成功!'
                }
                jsonWrite(res, replay);
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.body
            connection.query($sql.delete, [param.id], function(err, result) {
                let replay = {
                    code: 200,
                    msg: '删除成功!'
                }
                jsonWrite(res, replay);
                connection.release();
            });
        });
    },
};