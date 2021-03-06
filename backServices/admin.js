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


const TABLE_NAME = 'admin';

const SQL_CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                    id INT(11) NOT NULL AUTO_INCREMENT,
                    username VARCHAR(64) NOT NULL,
                    status INT NOT NULL DEFAULT '1',
                    password VARCHAR(64) NOT NULL,
                    accesstoken VARCHAR(64),
                    lastLoginTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    createdTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    PRIMARY KEY (id));`;


// const SQL_UPDATE_ID = `UPDATE ${TABLE_NAME} SET  lastLoginTime=? WHERE id = ?`;


const SQL_JUDGE_USER_EXIST = `SELECT * FROM ${TABLE_NAME} WHERE username = ?`;

const SQL_JUDGE_LOGIN_PASSWORD = `SELECT * FROM ${TABLE_NAME} WHERE username = ? AND password = ?`;

const SQL_GET_PAGE_NO_FILTER = `SELECT * FROM ${TABLE_NAME} ORDER BY updatedTime DESC LIMIT ? , ?`;

const SQL_GET_COUNT_NO_FILTER = `SELECT count(*) as cnt FROM ${TABLE_NAME}`;

const SQL_SET_ACCESSTOKEN = `UPDATE ${TABLE_NAME} SET  accesstoken =? WHERE id = ?`;

const SQL_SET = `INSERT INTO ${TABLE_NAME} (username,password,accesstoken) VALUES (?, ? ,?)`;

const SQL_DELETE_IDS = `DELETE FROM ${TABLE_NAME} WHERE id in ?`;

const SQL_CLEAR_ACCESSTOKEN = `UPDATE ${TABLE_NAME} SET accesstoken = '' WHERE id = ?`;

const SQL_MODIFY_PASSWORD = `UPDATE ${TABLE_NAME} SET password = ?   WHERE id = ?`;

const utils = require('./../utils/utils');
const mysql = require('mysql');
const config = require('../config');
const pool = mysql.createPool(config.mysql);

// const getSqlByParams = (params) => {
//     let { pageNo: offset, pageSize: limit, username, phone } = params;

//     offset = parseInt(offset);
//     limit = parseInt(limit);

//     let SQL_GET_PAGE = '';
//     let SQL_GET_COUNT = '';

//     if (!nickname && !phone) {
//         SQL_GET_PAGE = `SELECT * FROM ${TABLE_NAME} ORDER BY updatedTime DESC LIMIT ${(offset - 1) * limit} , ${limit}`;
//         SQL_GET_COUNT = `SELECT count(*) as cnt FROM ${TABLE_NAME} `;
//     } else {
//         SQL_GET_PAGE = `SELECT * FROM ${TABLE_NAME} WHERE  1 = 1 ${nicknameSQL} ${phoneSQL}  ORDER BY updatedTime DESC LIMIT ${(offset - 1) * limit} , ${limit}`;
//         SQL_GET_COUNT = `SELECT count(*) as cnt FROM ${TABLE_NAME} WHERE  1 = 1 ${nicknameSQL} ${phoneSQL}`;
//     }

//     return {
//         SQL_GET_COUNT,
//         SQL_GET_PAGE,
//     }
// }


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
    regist(params) {
        return new Promise((resolve, reject) => {
            let { phone, nickname, password } = params;
            const accesstoken = "";
            password = utils.md5(password);
            pool.getConnection((err, connection) => {
                connection.query(SQL_SET, [username, password, accesstoken], (err) => {
                    if (!err) {
                        resolve({ flag: true });
                    } else {
                        reject({ flag: false, err });
                        console.log("regist error->", err);
                    }
                    connection.release();
                });
            });
        });
    }

    // //根据id更新
    // back_update_id(params) {
    //     return new Promise((resolve, reject) => {
    //         let { id, phone, password } = params;
    //         let sqlQuery = "";
    //         let queryArr = [];
    //         if (phone) {
    //             sqlQuery = SQL_UPDATE_ID;
    //             queryArr = [phone, id];
    //         } else if (password) {
    //             password = utils.md5(password);
    //             sqlQuery = SQL_MODIFY_PASSWORD;
    //             queryArr = [password, id];
    //         }

    //         pool.getConnection((err, connection) => {
    //             //更新数据
    //             connection.query(sqlQuery, queryArr, (err, data) => {
    //                 if (!err) {
    //                     resolve({ flag: true });
    //                 } else {
    //                     reject({ flag: false, err });
    //                     console.log("back_update_id error->", err);
    //                 }

    //                 connection.release();
    //             });

    //         });
    //     })
    // }

    // //批量删除
    // back_batch_delete(params) {
    //     return new Promise((resolve, reject) => {
    //         let { ids } = params;
    //         ids = "(" + ids + ")";
    //         const query = `DELETE FROM ${TABLE_NAME} WHERE id in ${ids}`;

    //         pool.getConnection((err, connection) => {
    //             connection.query(query, (err) => {
    //                 if (!err) {
    //                     resolve({ flag: true });
    //                 } else {
    //                     reject({ flag: false, err });
    //                     console.log("back_batch_delete error->", err);
    //                 }

    //                 connection.release()
    //             });
    //         });

    //     });
    // }

    //分页查询数据
    // getListByOffset(params) {
    //     return new Promise((resolve, reject) => {
    //         const { SQL_GET_PAGE } = getSqlByParams(params);

    //         pool.getConnection((err, connection) => {
    //             connection.query(SQL_GET_PAGE, (err, data) => {
    //                 if (!err) {
    //                     resolve({ flag: true, data });
    //                 } else {
    //                     reject({ flag: false, err });
    //                 }
    //                 connection.release();
    //             });
    //         });

    //     })
    // }

    // //获取所有数据的数量
    // getAllCount(params) {
    //     return new Promise((resolve, reject) => {
    //         const { SQL_GET_COUNT } = getSqlByParams(params);
    //         //查询数据的数量
    //         pool.getConnection((err, connection) => {
    //             connection.query(SQL_GET_COUNT, (err, data) => {
    //                 if (!err) {
    //                     resolve(data);
    //                 } else {
    //                     reject({ flag: false, err });
    //                     console.log("getAllCount error->", err);
    //                 }
    //                 connection.release();
    //             });
    //         });
    //     })
    // }

    // //判断是否存在
    judgeAdminPassword(params) {
        return new Promise((resolve, reject) => {
            let { phone, password } = params;
            password = utils.md5(password);
            pool.getConnection((err, connection) => {
                connection.query(SQL_JUDGE_LOGIN_PASSWORD, [username, password], (err, data) => {
                    if (!err) {
                        resolve({ flag: true, data });
                    } else {
                        reject({ flag: false, err });
                        console.log("judgeAdminExist error->", err);
                    }

                    connection.release();
                });
            });
        });
    }

    // judgeAdminExist(params) {
    //     return new Promise((resolve, reject) => {
    //         let { phone } = params;
    //         pool.getConnection((err, connection) => {
    //             connection.query(SQL_JUDGE_USER_EXIST, [phone], (err, data) => {
    //                 if (!err) {
    //                     resolve({ flag: true, data });
    //                 } else {
    //                     reject({ flag: false, err });
    //                     console.log("SQL_JUDGE_USER_EXIST error->", err);
    //                 }
    //                 connection.release();
    //             });
    //         });
    //     });
    // }
    //设置accesstoekn
    setAccesstoken(params) {
        return new Promise((resolve, reject) => {
            const { id } = params;
            const lastLoginTime = new Date().getTime();
            const ass = (id + lastLoginTime).toString();
            const accesstoken = utils.md5(ass);

            pool.getConnection((err, connection) => {
                connection.query(SQL_SET_ACCESSTOKEN, [accesstoken, id], (err, data) => {
                    if (!err) {
                        params.accesstoken = accesstoken;
                        resolve({ flag: true, data: params });
                    } else {
                        reject({ flag: false, err });
                        console.log("setAccesstoken error->", err);
                    }

                    connection.release();
                });
            });
        });
    }
    //清空
    clearAccesstoken(params) {
        return new Promise((resolve, reject) => {
            const { id } = params;

            pool.getConnection((err, connection) => {
                connection.query(SQL_CLEAR_ACCESSTOKEN, [id], (err) => {
                    if (!err) {
                        resolve({ flag: true });
                    } else {
                        reject({ flag: false, err });
                        console.log("clearAccesstoken error->", err);
                    }

                    connection.release();
                });
            });
        });
    }
}


module.exports = MySqlStore;