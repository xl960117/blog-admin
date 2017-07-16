/**
 * Created by Administrator on 2017/2/21.
 */
// CRUD SQL语句
var article = {
    insert: 'INSERT INTO article(title, author, content) VALUES(?,?,?)',
    update: 'update article set title=?, author=?, content=? where id=?',
    delete: 'delete from article where id=?',
    queryById: 'select * from article where id=?',
    queryAll: 'select * from article'
};

module.exports = article;