/**
 * @Author:CaoZiHao
 * @description:
 * @Date:2017/5/8
 * @Time:15:58
 */
/**
 * @Author:CaoZiHao
 * @description:
 * @Date:2017/5/3
 * @Time:17:04
 */

const TABLE_NAME = 'goods';

const SQL_CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                    id INT(11) NOT NULL AUTO_INCREMENT,
                    category INT NOT NULL,
                    status INT NOT NULL,
                    imgurl VARCHAR(64),
                    place INT NOT NULL,

                    userId INT NOT NULL,
                    username  VARCHAR(64) NOT NULL,
                    
                    articleTitle VARCHAR(64) NOT NULL,
                    articleReadNum INT,
                    articleContent  VARCHAR(64),

                    createdTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    PRIMARY KEY (id));`;

//获取数量
const SQL_GET_COUNT_NO_FILTER = `SELECT count(*) as cnt FROM ${TABLE_NAME}`;

// const SQL_DELETE = `DELETE FROM ${TABLE_NAME} WHERE id = ?`;

//下一条
const SQL_GET_NEXT = `SELECT *  FROM ${TABLE_NAME} WHERE  id > ?  ORDER BY id ASC LIMIT 1`;

//上一条
const SQL_GET_PREVIOUS = `SELECT *  FROM ${TABLE_NAME} WHERE  id < ?  ORDER BY id DESC LIMIT 1`;

// limit : 要显示多少条记录
// offset : 跳过多少条记录
const SQL_GET_PAGE_NO_FILTER = `SELECT * FROM ${TABLE_NAME} ORDER BY updatedTime DESC LIMIT ? , ?`;

const SQL_GET_ID = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;

const SQL_UPDATE_ID = `UPDATE ${TABLE_NAME} SET title = ?,author = ?,content =?  WHERE id = ?`;

const SQL_SET = `INSERT  INTO ${TABLE_NAME} (title, author,readNum,content) VALUES (?, ?, ?, ?)`;

const mysql = require('mysql');
const config = require('../config');
const pool = mysql.createPool(config.mysql);

class MySqlStore {
    //初始化
    constructor() {
        pool.getConnection((err, connection) => {
            connection.query(SQL_CREATE_TABLE, (err) => {
                connection.release();
            })
        });
    }

    //添加一条数据
    back_add(params) {
        return new Promise((resolve, reject) => {
            const { category, status, imgurl, place, userId, username, articleTitle, articleReadNum, articleContent } = params;

            pool.getConnection((err, connection) => {
                connection.query(SQL_SET, [category, status, imgurl, place, userId, username, articleTitle, articleReadNum, articleContent], (err) => {
                    if (!err) {
                        resolve({ flag: true });
                    } else {
                        reject({ flag: false, err });
                        console.log("back_add error->", err);
                    }
                    connection.release();
                });
            });
        });
    }

    //批量删除
    back_batch_delete(params) {
        return new Promise((resolve, reject) => {
            let { ids } = params;
            ids = "(" + ids + ")";
            const query = `DELETE FROM ${TABLE_NAME} WHERE id in ${ids}`;

            pool.getConnection((err, connection) => {
                connection.query(query, (err) => {
                    if (!err) {
                        resolve({ flag: true });
                    } else {
                        reject({ flag: false, err });
                        console.log("back_batch_delete error->", err);
                    }
                    connection.release();
                });
            });
        });
    }

    //根据id找数据
    back_get_id(params) {
        return new Promise((resolve, reject) => {
            const { id } = params;
            //查询单条

            pool.getConnection((err, connection) => {
                connection.query(SQL_GET_ID, [id], (err, data) => {
                    if (!err) {
                        resolve({ flag: true, data });
                    } else {
                        reject({ flag: false, err });
                        console.log("back_get_id error->", err);
                    }
                    connection.release();
                });
            });

        });
    }

    //根据id更新
    back_update_id(params) {
        return new Promise((resolve, reject) => {
            const { id, title, author, content } = params;
            //更新数据

            pool.getConnection((err, connection) => {
                connection.query(SQL_UPDATE_ID, [title, author, content, id], (err, data) => {
                    if (!err) {
                        resolve({ flag: true });
                    } else {
                        reject({ flag: false, err });
                        console.log("back_update_id error->", err);
                    }
                    connection.release();
                });
            });
        })
    }

    //获取所有数据的数量
    back_get_all_count(params) {
        return new Promise((resolve, reject) => {
            const { filterUserName } = params;
            let SQL_GET_COUNT = SQL_GET_COUNT_NO_FILTER;
            // console.log("back_get_all_count filterUserName ->",filterUserName);
            if (filterUserName) {
                SQL_GET_COUNT = `SELECT count(*) as cnt FROM ${TABLE_NAME}
                WHERE author LIKE '%${filterUserName}%'   
                OR title LIKE '%${filterUserName}%'
                OR content LIKE '%${filterUserName}%'`;
            }
            //查询数据的数量
            pool.getConnection((err, connection) => {
                connection.query(SQL_GET_COUNT, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject({ flag: false, err });
                        console.log("back_get_all_count error->", err);
                    }
                    connection.release();
                });
            });
        })
    }

    //分页查询数据
    back_get_page(params) {
        return new Promise((resolve, reject) => {
            let { pageNo: offset, pageSize: limit, filterUserName } = params;
            let SQL_GET_PAGE = SQL_GET_PAGE_NO_FILTER;
            if (filterUserName) {
                SQL_GET_PAGE = `SELECT * FROM ${TABLE_NAME} 
            WHERE author LIKE '%${filterUserName}%'   
            OR title LIKE '%${filterUserName}%'
            OR content LIKE '%${filterUserName}%'
            ORDER BY updatedTime DESC
            LIMIT ? , ?`;
            }
            //查询多条
            offset = parseInt(offset);
            limit = parseInt(limit);
            pool.getConnection((err, connection) => {
                connection.query(SQL_GET_PAGE, [(offset - 1) * limit, limit], function (err, data) {
                    if (!err) {
                        resolve({ flag: true, data });
                    } else {
                        reject({ flag: false, err });
                    }
                    connection.release();
                });
            });

        })
    }
    //查找上一条
    front_get_page_previous(params) {
        return new Promise((resolve, reject) => {
            const { id } = params;
            pool.getConnection((err, connection) => {
                connection.query(SQL_GET_PREVIOUS, [id], (err, data) => {
                    if (!err) {
                        resolve({ flag: true, data });
                    } else {
                        reject({ flag: false, err });
                        console.log("front_get_page_previous error->", err);
                    }
                    connection.release();
                });
            });
        })
    }

    //查找下一条
    front_get_page_next(params) {
        return new Promise((resolve, reject) => {
            const { id } = params;
            pool.getConnection((err, connection) => {
                connection.query(SQL_GET_NEXT, [id], (err, data) => {
                    if (!err) {
                        resolve({ flag: true, data });
                    } else {
                        reject({ flag: false, err });
                        console.log("front_get_page_next error->", err);
                    }
                    connection.release();
                });
            });

        })
    }
}


module.exports = MySqlStore;