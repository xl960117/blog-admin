/**
 * Created by Administrator on 2017/2/22.
 */
// CRUD SQL语句
var tag = {
    insert: 'INSERT INTO tag(name) VALUES(?)',
    update: 'update tag set name=? where id=?',
    delete: 'delete from tag where id=?',
    queryAll: 'select * from tag'
};

module.exports = tag;