/**
 * @Author:CaoZiHao
 * @description:
 * @Date:2017/5/8
 * @Time:14:26
 */
const userMySqlStore = require('./../backServices/user');
const store = new userMySqlStore('./dbSqllite/user.db');
const utils = require('./../utils/utils');

const user = {
    back_add: async (ctx, next) => {
        utils.setHeaders(ctx);
        const params = ctx.request.body ? ctx.request.body : null;
        let { flag, data, err } = await store.back_add(params);
        let res = null;
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
    /*     back_update_id: async (ctx, next) => {
            utils.setHeaders(ctx);
            const params = ctx.request.body ? ctx.request.body : null;
    
            let { flag, data, err } = await store.back_update_id(params);
            let res = null;
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
        back_batch_delete: async (ctx, next) => {
            utils.setHeaders(ctx);
            const params = ctx.request.body ? ctx.request.body : null;
            let { flag, data, err } = await store.back_batch_delete(params);
            let res = null;
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
        back_get_page: async (ctx, next) => {
            utils.setHeaders(ctx);
            const queryParams = ctx.request.query ? ctx.request.query : null;
            let { flag, data, err } = await store.back_get_page(queryParams);
            let cnt = await store.back_get_all_count(queryParams);
            let { cnt: total } = cnt[0];
            let res = null;
    
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
                    code: -1,
                    data: {
                        entities: null,
                        total: null
                    },
                    message: err
                };
            }
            ctx.response.body = res;
        }, */
    back_login: async (ctx, next) => {
        utils.setHeaders(ctx);
        const params = ctx.request.body ? ctx.request.body : null;
        let res = null;
        let { flag, data, err } = await store.back_judgeUserExist(params);
        if (data.length) {
            let { flag, data, err } = await store.back_setAccesstoken(data[0]);
            const { id, username, accesstoken } = data;
            if (flag) {
                res = {
                    code: 0,
                    data: {
                        userId: id,
                        username,
                        accesstoken
                    }
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

        } else {
            res = {
                code: -1,
                data: null,
                message: "账号不存在或账号密码错误！"
            };
        }

        ctx.response.body = res;
    },
    back_logout: async (ctx, next) => {
        utils.setHeaders(ctx);
        const params = ctx.request.body ? ctx.request.body : null;
        let { flag, data, err } = await store.back_clearAccesstoken(params);
        let res = null;
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
    }

};

module.exports = {
    // 'GET /rabbit/user/back_get_page': user.back_get_page,
    // 'POST /rabbit/user/back_update_id': user.back_update_id,
    'POST /rabbit/user/back_add': user.back_add,
    // 'POST /rabbit/user/back_batch_delete': user.back_batch_delete,
    'POST /rabbit/user/back_login': user.back_login,
    'POST /rabbit/user/back_logout': user.back_logout
};
