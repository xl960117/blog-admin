/**
 * Created by Administrator on 2017/2/21.
 */
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/mysql');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

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
            // 获取前台页面传过来的参数
            var param = req.body

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.insert, [param.name, param.password], function(err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    },
    edit: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.body
            connection.query($sql.update, [param.name, param.password, param.id], function(err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg:'修改成功'
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
    detail: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.body
            connection.query($sql.queryById, [param.id], function(err, result) {
                let replay = {
                    code: 200,
                    data: result[0],
                    msg: '获取成功!'
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
    login: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            var param = req.body
            console.log(req.body)
            connection.query($sql.login, [param.name], function(err, result) {
                if (result.length > 0) {
                    if (result[0].password == param.password) {
                        result = {
                            code: 200,
                            msg: '登录成功!'
                        }
                    } else {
                        result = {
                            code: 1,
                            msg: '密码错误!'
                        }
                    }
                } else {
                    result = {
                        code: 1,
                        msg: '用户名不存在!'
                    }
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
};