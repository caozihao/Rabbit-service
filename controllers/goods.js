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

const goods = {
    back_get_page: async (ctx, next) => {
        utils.setHeaders(ctx);
        let queryParams = ctx.request.query ? ctx.request.query : null;
        queryParams.interface = "/rabbit/goods/back_get_page";
        let res = null;
        let { flag, data, err } = await store.back_get_page(queryParams);
        let cnt = await store.back_get_all_count(queryParams);
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
    //     let cnt = await store.back_get_all_count(queryParams);
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
    back_get_id: async (ctx, next) => {
        utils.setHeaders(ctx);
        const queryParams = ctx.request.query ? ctx.request.query : null;
        queryParams.interface = "/rabbit/goods/back_get_id";
        let res = null;
        let { flag, data, err } = await store.back_get_id(queryParams);
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
                code: -1,
                data: {
                    entities: null,
                    total: null
                },
                message: err
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
    // back_batch_delete: async (ctx, next) => {
    //     utils.setHeaders(ctx);
    //     const params = ctx.request.body ? ctx.request.body : null;
    //     params.interface = "/rabbit/goods/back_batch_delete";
    //     let res = null;
    //     let { flag, data, err } = await store.back_batch_delete(params);
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
    back_add: async (ctx, next) => {
        utils.setHeaders(ctx);
        const params = ctx.request.body ? ctx.request.body : null;
        params.interface = "/rabbit/goods/back_add";
        let res = null;

        let { flag, data, err } = await store.back_add(params);
        if (flag) {
            res = {
                code: 0,
                data: null,
                message: null
            };
        } else {
            res = {
                code: -1,
                data: null,
                message: err
            };
        }
        ctx.response.body = res;
    },
    // back_update_id: async (ctx, next) => {
    //     utils.setHeaders(ctx);
    //     const params = ctx.request.body ? ctx.request.body : null;
    //     params.interface = "/rabbit/goods/back_update_id";
    //     let res = null;

    //     let { flag, data, err } = await store.back_update_id(params);

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

    'GET /rabbit/goods/back_get_page': goods.back_get_page,
    'GET /rabbit/goods/back_get_id': goods.back_get_id,
    // 'POST /rabbit/goods/back_batch_delete': goods.back_batch_delete,
    'POST /rabbit/goods/back_add': goods.back_add,
    // 'POST /rabbit/goods/back_update_id': goods.back_update_id


};