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


const TABLE_NAME = 'comment';

const SQL_CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
                    id INT(11) NOT NULL AUTO_INCREMENT,
                    content TEXT NOT NULL,
                    goodsId INT(11) NOT NULL,
                    userId INT(11) NOT NULL,
                    status INT NOT NULL DEFAULT '1',
                    userNickname VARCHAR(64) NOT NULL,
                    createdTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    PRIMARY KEY (id));`;

const SQL_SET = `INSERT INTO ${TABLE_NAME} (content, userId,userNickname,goodsId) VALUES (?, ? ,?, ?)`;
const SQL_DELETE_IDS = `DELETE FROM ${TABLE_NAME} WHERE id in ?`;
const utils = require('./../utils/utils');
const mysql = require('mysql');
const config = require('../config');
const pool = mysql.createPool(config.mysql);

const getSqlByParams = (params) => {
    let { pageNo: offset, pageSize: limit, goodsId } = params;

    offset = parseInt(offset);
    limit = parseInt(limit);

    let SQL_GET_PAGE = '';
    let SQL_GET_COUNT = '';

    if (goodsId) {
        SQL_GET_PAGE = `SELECT * FROM ${TABLE_NAME} WHERE  goodsId = '${goodsId}' ORDER BY updatedTime DESC LIMIT ${(offset - 1) * limit} , ${limit}`;
        SQL_GET_COUNT = `SELECT count(*) as cnt FROM ${TABLE_NAME} WHERE goodsId = '${goodsId}'`;
    } else {
        SQL_GET_PAGE = `SELECT * FROM ${TABLE_NAME}  ORDER BY updatedTime DESC LIMIT ${(offset - 1) * limit} , ${limit}`;
        SQL_GET_COUNT = `SELECT count(*) as cnt FROM ${TABLE_NAME}`;
    }

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

}


module.exports = MySqlStore;