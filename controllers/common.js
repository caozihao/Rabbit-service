/**
 * @Author:CaoZiHao
 * @description:
 * @Date:2017/5/8
 * @Time:14:26
 */
const goodsMySqlStore = require('./../backServices/goods');
const commentMySqlStore = require('./../backServices/comment');
const userMySqlStore = require('./../backServices/user');

const goodsStore = new goodsMySqlStore('./dbSqllite/goods.db');
const commentStore = new commentMySqlStore('./dbSqllite/comment.db');
const userStore = new userMySqlStore('./dbSqllite/user.db');
const utils = require('./../utils/utils');
const fetch = require('node-fetch');
const config = require('../config');
const errorConstant = require('./../errorConstants');
const { USER_EXIST, USER_NOT_EXIST, LOGIN_PASSWORD_ERROR, SYS_ERROR } = errorConstant;

const common = {
    getStatistics: async (ctx, next) => {
        utils.setHeaders(ctx);
        let queryParams = ctx.request.query ? ctx.request.query : null;
        let res = null;
        const commonPageParams = {
            pageNo: 1,
            pageSize: 5,
        };
        let searchCount = await goodsStore.getAllCount({ type: 'search', ...commonPageParams });
        let { cnt: searchTotal } = searchCount[0];
        let receiveCount = await goodsStore.getAllCount({ type: 'receive', ...commonPageParams });
        let { cnt: receiveTotal } = receiveCount[0];
        let commentCount = await commentStore.getAllCount({ ...commonPageParams });
        let { cnt: commentTotal } = commentCount[0];
        let userCount = await userStore.getAllCount({ ...commonPageParams });
        let { cnt: userTotal } = userCount[0];

        if (searchCount && receiveCount && commentCount && userCount) {
            res = {
                code: 0,
                data: {
                    entity: {
                        searchTotal,
                        receiveTotal,
                        commentTotal,
                        userTotal,
                    }
                },
                message: null
            };
        } else {
            res = {
                data: null,
                ...SYS_ERROR,
            };
        }
        ctx.response.body = res;
    },
};

module.exports = {
    'GET /rabbitApi/common/getStatistics': common.getStatistics,
};