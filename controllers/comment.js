/**
 * @Author:CaoZiHao
 * @description:
 * @Date:2017/5/8
 * @Time:14:26
 */
const commentMySqlStore = require('./../backServices/comment');
const store = new commentMySqlStore('./dbSqllite/comment.db');
const utils = require('./../utils/utils');
const fetch = require('node-fetch');
const config = require('../config');
const errorConstant = require('./../errorConstants');
const { USER_EXIST, USER_NOT_EXIST, LOGIN_PASSWORD_ERROR, SYS_ERROR } = errorConstant;

const comment = {
    getListByOffset: async (ctx, next) => {
        utils.setHeaders(ctx);
        let queryParams = ctx.request.query ? ctx.request.query : null;
        let res = null;
        let { flag, data, err } = await store.getListByOffset(queryParams);
        let cnt = await store.getAllCount(queryParams);
        let { cnt: total } = cnt[0];
        if (flag) {
            res = {
                code: 0,
                data: {
                    entities: data,
                    total
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
    // batchDeleteByIds: async (ctx, next) => {
    //     utils.setHeaders(ctx);
    //     const params = ctx.request.body ? ctx.request.body : null;
    //     let res = null;
    //     let { flag, data, err } = await store.batchDeleteByIds(params);
    //     if (flag) {
    //         res = {
    //             code: 0,
    //             data: null,
    //             message: null
    //         };
    //     } else {
    //         res = {
    //             code: -1,
    //             data: null,
    //             message: err
    //         };
    //     }

    //     ctx.response.body = res;
    // },
    create: async (ctx, next) => {
        utils.setHeaders(ctx);
        const params = ctx.request.body ? ctx.request.body : null;
        let res = null;

        let { flag, err } = await store.create(params);
        if (flag) {
            res = {
                code: 0,
                data: null,
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

    batchUpdateStatusByIds: async (ctx, next) => {
        utils.setHeaders(ctx);
        const params = ctx.request.body ? ctx.request.body : null;
        let { flag, data, err } = await store.batchUpdateStatusByIds(params);
        let res = null;
        if (flag) {
            res = {
                code: 0,
                data: null,
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
    // updateById: async (ctx, next) => {
    //     utils.setHeaders(ctx);
    //     const params = ctx.request.body ? ctx.request.body : null;
    //     let res = null;

    //     let { flag, data, err } = await store.updateById(params);

    //     if (flag) {
    //         res = {
    //             code: 0,
    //             data: null,
    //             message: null
    //         };
    //     } else {
    //         res = {
    //             code: -1,
    //             data: null,
    //             message: err
    //         };
    //     }

    //     ctx.response.body = res;
    // },
};

module.exports = {
    // 'GET /rabbit/comment/front_get_page': comment.front_get_page,
    // 'GET /rabbit/comment/front_get_id': comment.front_get_id,
    // 'GET /rabbit/comment/front_get_page_previous': comment.front_get_page_previous,
    // 'GET /rabbit/comment/front_get_page_next': comment.front_get_page_next,
    'GET /rabbitApi/comment/getListByOffset': comment.getListByOffset,
    // 'POST /rabbit/comment/batchDeleteByIds': comment.batchDeleteByIds,
    'POST /rabbitApi/comment/create': comment.create,
    'POST /rabbitApi/comment/batchUpdateStatusByIds': comment.batchUpdateStatusByIds,
    // 'POST /rabbit/comment/updateById': comment.updateById

};