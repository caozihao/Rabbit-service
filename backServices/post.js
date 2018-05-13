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

const TABLE_NAME = 'post';

const SQL_CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                    id INT(11) NOT NULL AUTO_INCREMENT,
                    status INT NOT NULL DEFAULT '1',  
                    title VARCHAR(64) NOT NULL,

                    readNum INT(11) DEFAULT 1 ,
                    content TEXT,
                    type VARCHAR(64) NOT NULL,
                    goodsCategory INT NOT NULL,
                    goodsPlace  VARCHAR(64) NOT NULL,
                    uploadFilename VARCHAR(64),
                    userId INT NOT NULL,
                    userNickname  VARCHAR(64) NOT NULL,
                    userPhone VARCHAR(64) NOT NULL,
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

const SQL_UPDATE_ID = `UPDATE ${TABLE_NAME} SET type=?,title=?, goodsCategory=?,goodsPlace=?,content=?,userId=?,userNickname=?,userPhone=? ,uploadFilename=? WHERE id = ?`;

const SQL_UPDATE_READNUM_ID = `UPDATE ${TABLE_NAME} SET readNum = readNum + 1 WHERE id = ?`;

const SQL_SET = `INSERT  INTO ${TABLE_NAME} (type,title, goodsCategory,goodsPlace,content,userId,userNickname,userPhone,uploadFilename) VALUES (?,?,?,?,?,?,?,?,?)`;

const SQL_BATCH_UPDATE_STATUS = `UPDATE ${TABLE_NAME} SET status = ?  WHERE id in (?)`;

const mysql = require('mysql');
const config = require('../config');
const pool = mysql.createPool(config.mysql);


const getSqlByParams = (params) => {
    let { pageNo: offset, pageSize: limit, goodsPlace, goodsCategory, type, startTime, endTime, status } = params;
    // let SQL_GET_PAGE = SQL_GET_PAGE_NO_FILTER;
    let palceSQL = '';
    let goodsCategorySQL = '';
    let createdTimeSQL = '';
    let typeSQL = '';
    let statusSQL = '';


    if (type) {
        typeSQL = `AND type = '${type}'`;
    }

    if (goodsPlace) {
        palceSQL = `AND goodsPlace LIKE '%${goodsPlace}%'`;
    }

    if (goodsCategory) {
        goodsCategorySQL = `AND goodsCategory = '${goodsCategory}'`;
    }

    if (status) {
        statusSQL = `AND status=${status}`;
    }

    if (startTime && endTime) {
        createdTimeSQL = `AND createdTime BETWEEN '${startTime}' AND '${endTime}'`;
    }

    offset = parseInt(offset);
    limit = parseInt(limit);

    let SQL_GET_PAGE = `SELECT * FROM ${TABLE_NAME} WHERE  1 = 1  ${typeSQL} ${palceSQL} ${goodsCategorySQL} ${createdTimeSQL} ${statusSQL} ORDER BY updatedTime DESC LIMIT ${(offset - 1) * limit} , ${limit}`;
    let SQL_GET_COUNT = `SELECT count(*) as cnt FROM ${TABLE_NAME}  WHERE 1=1  ${typeSQL}  ${palceSQL} ${goodsCategorySQL} ${createdTimeSQL} ${statusSQL}`;


    return {
        SQL_GET_COUNT,
        SQL_GET_PAGE,
    }
}


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
    create(params) {
        return new Promise((resolve, reject) => {
            const arr = [];
            for (let i in params) {
                arr.push(params[i]);
            }

            pool.getConnection((err, connection) => {
                connection.query(SQL_SET, arr, (err) => {
                    if (!err) {
                        resolve({ flag: true });
                    } else {
                        reject({ flag: false, err });
                        console.log("create error->", err);
                    }
                    connection.release();
                });
            });
        });
    }

    //批量删除
    batchDeleteByIds(params) {
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
                        console.log("batchDeleteByIds error->", err);
                    }
                    connection.release();
                });
            });
        });
    }

    //根据id找数据
    getById(params) {
        return new Promise((resolve, reject) => {
            const { id } = params;
            //查询单条

            pool.getConnection((err, connection) => {
                connection.query(SQL_GET_ID, [id], (err, data) => {
                    if (!err) {
                        resolve({ flag: true, data });
                    } else {
                        reject({ flag: false, err });
                        console.log("getById error->", err);
                    }
                    connection.release();
                });
            });

        });
    }

    //根据id更新
    updateById(params) {
        return new Promise((resolve, reject) => {
            const arr = [];
            for (let i in params) {
                arr.push(params[i]);
            }
            //更新数据
            pool.getConnection((err, connection) => {
                connection.query(SQL_UPDATE_ID, arr, (err, data) => {
                    if (!err) {
                        resolve({ flag: true });
                    } else {
                        reject({ flag: false, err });
                        console.log("updateById error->", err);
                    }
                    connection.release();
                });
            });
        })
    }

    //更新阅读数
    updateReadNumById(params) {
        return new Promise((resolve, reject) => {
            const { id } = params
            //更新数据
            pool.getConnection((err, connection) => {
                connection.query(SQL_UPDATE_READNUM_ID, [id], (err, data) => {
                    if (!err) {
                        resolve({ flag: true });
                    } else {
                        reject({ flag: false, err });
                        console.log("updateById error->", err);
                    }
                    connection.release();
                });
            });
        })
    }


    //获取所有数据的数量
    getAllCount(params) {
        return new Promise((resolve, reject) => {
            const { SQL_GET_COUNT } = getSqlByParams(params);
            //查询数据的数量
            pool.getConnection((err, connection) => {
                connection.query(SQL_GET_COUNT, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject({ flag: false, err });
                        console.log("getAllCount error->", err);
                    }
                    connection.release();
                });
            });
        })
    }

    //分页查询数据
    getListByOffset(params) {
        return new Promise((resolve, reject) => {
            const { SQL_GET_PAGE } = getSqlByParams(params);

            pool.getConnection((err, connection) => {
                connection.query(SQL_GET_PAGE, (err, data) => {
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

    batchUpdateStatusByIds(params) {
        return new Promise((resolve, reject) => {
            let { ids, status } = params;
            // ids = "(" + ids + ")";
            pool.getConnection((err, connection) => {
                connection.query(SQL_BATCH_UPDATE_STATUS, [status, ids], (err) => {
                    if (!err) {
                        resolve({ flag: true });
                    } else {
                        reject({ flag: false, err });
                        console.log("BatchUpdateStatusById error->", err);
                    }
                    connection.release()
                });
            });

        });
    }
    //查找上一条
    // front_get_page_previous(params) {
    //     return new Promise((resolve, reject) => {
    //         const { id } = params;
    //         pool.getConnection((err, connection) => {
    //             connection.query(SQL_GET_PREVIOUS, [id], (err, data) => {
    //                 if (!err) {
    //                     resolve({ flag: true, data });
    //                 } else {
    //                     reject({ flag: false, err });
    //                     console.log("front_get_page_previous error->", err);
    //                 }
    //                 connection.release();
    //             });
    //         });
    //     })
    // }

    //查找下一条
    // front_get_page_next(params) {
    //     return new Promise((resolve, reject) => {
    //         const { id } = params;
    //         pool.getConnection((err, connection) => {
    //             connection.query(SQL_GET_NEXT, [id], (err, data) => {
    //                 if (!err) {
    //                     resolve({ flag: true, data });
    //                 } else {
    //                     reject({ flag: false, err });
    //                     console.log("front_get_page_next error->", err);
    //                 }
    //                 connection.release();
    //             });
    //         });

    //     })
    // }
}



module.exports = MySqlStore;