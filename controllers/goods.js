/**
 * @Author:CaoZiHao
 * @description:
 * @Date:2017/5/8
 * @Time:14:26
 */
const goodsMySqlStore = require('./../backServices/goods');
const store = new goodsMySqlStore('./dbSqllite/goods.db');
const utils = require('./../utils/utils');
const fetch = require('node-fetch');
const config = require('../config');
const errorConstant = require('./../errorConstants');
const { USER_EXIST, USER_NOT_EXIST, LOGIN_PASSWORD_ERROR, SYS_ERROR } = errorConstant;

const goods = {
    getListByOffset: async (ctx, next) => {
        utils.setHeaders(ctx);
        let queryParams = ctx.request.query ? ctx.request.query : null;
        queryParams.interface = "/rabbit/goods/getListByOffset";
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
    // front_get_page: async (ctx, next) => {
    //     utils.setHeaders(ctx);
    //     const queryParams = ctx.request.query ? ctx.request.query : null;
    //     queryParams.pageNo = queryParams.offset;
    //     queryParams.pageSize = queryParams.limit;
    //     let { flag, data, err } = await store.back_get_page(queryParams);
    //     let res = null;
    //     let cnt = await store.getAllCount(queryParams);
    //     let { cnt: total } = cnt[0];

    //     if (flag) {
    //         res = {
    //             code: 0,
    //             data: {
    //                 entities: data,
    //                 total
    //             },
    //             message: null
    //         };
    //     } else {
    //         res = {
    //             code: -1,
    //             data: {
    //                 entities: null,
    //                 total: null
    //             },
    //             message: err
    //         };
    //     }
    //     ctx.response.body = res;
    // },
    getById: async (ctx, next) => {
        utils.setHeaders(ctx);
        const queryParams = ctx.request.query ? ctx.request.query : null;
        let res = null;
        let { flag, data, err } = await store.getById(queryParams);
        if (flag) {
            res = {
                code: 0,
                data: {
                    entities: data
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
    // front_get_id: async (ctx, next) => {
    //     utils.setHeaders(ctx);
    //     const queryParams = ctx.request.query ? ctx.request.query : null;
    //     let { flag, data, err } = await store.back_get_id(queryParams);
    //     let res = null;
    //     if (flag) {
    //         res = {
    //             code: 0,
    //             data: {
    //                 entities: data
    //             },
    //             message: null
    //         };
    //     } else {
    //         res = {
    //             code: -1,
    //             data: {
    //                 entities: null,
    //                 total: null
    //             },
    //             message: err
    //         };
    //     }
    //     ctx.response.body = res;
    // },
    // batchDeleteByIds: async (ctx, next) => {
    //     utils.setHeaders(ctx);
    //     const params = ctx.request.body ? ctx.request.body : null;
    //     params.interface = "/rabbit/goods/batchDeleteByIds";
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
    // updateById: async (ctx, next) => {
    //     utils.setHeaders(ctx);
    //     const params = ctx.request.body ? ctx.request.body : null;
    //     params.interface = "/rabbit/goods/updateById";
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
    // front_get_page_previous: async (ctx, next) => {
    //     utils.setHeaders(ctx);
    //     const queryParams = ctx.request.query ? ctx.request.query : null;
    //     let { flag, data, err } = await store.front_get_page_previous(queryParams);
    //     let res = null;
    //     if (flag) {
    //         res = {
    //             code: 0,
    //             data: {
    //                 entities: data
    //             },
    //             message: null
    //         };
    //     } else {
    //         res = {
    //             code: -1,
    //             data: {
    //                 entities: null,
    //                 total: null
    //             },
    //             message: err
    //         };
    //     }
    //     ctx.response.body = res;
    // },
    // front_get_page_next: async (ctx, next) => {
    //     utils.setHeaders(ctx);
    //     const queryParams = ctx.request.query ? ctx.request.query : null;
    //     let { flag, data, err } = await store.front_get_page_next(queryParams);
    //     let res = null;

    //     if (flag) {
    //         res = {
    //             code: 0,
    //             data: {
    //                 entities: data
    //             },
    //             message: null
    //         };
    //     } else {
    //         res = {
    //             code: -1,
    //             data: {
    //                 entities: null,
    //                 total: null
    //             },
    //             message: err
    //         };
    //     }
    //     ctx.response.body = res;
    // }
};

module.exports = {
    // 'GET /rabbit/goods/front_get_page': goods.front_get_page,
    // 'GET /rabbit/goods/front_get_id': goods.front_get_id,
    // 'GET /rabbit/goods/front_get_page_previous': goods.front_get_page_previous,
    // 'GET /rabbit/goods/front_get_page_next': goods.front_get_page_next,

    'GET /rabbitApi/goods/getListByOffset': goods.getListByOffset,
    'GET /rabbitApi/goods/getById': goods.getById,
    // 'POST /rabbit/goods/batchDeleteByIds': goods.batchDeleteByIds,
    'POST /rabbitApi/goods/create': goods.create,
    // 'POST /rabbit/goods/updateById': goods.updateById


};