/**
 * @Author:CaoZiHao
 * @description:
 * @Date:2017/5/8
 * @Time:14:26
 */
const adminMySqlStore = require('./../backServices/admin');
const store = new adminMySqlStore('./dbSqllite/admin.db');
const utils = require('./../utils/utils');
const errorConstant = require('./../errorConstants');
const { USER_EXIST, USER_NOT_EXIST, LOGIN_PASSWORD_ERROR, SYS_ERROR } = errorConstant;

const admin = {
    test: async (ctx, next) => {
        ctx.response.body = 'Hello World';
    },
    regist: async (ctx, next) => {
        utils.setHeaders(ctx);
        const params = ctx.request.body ? ctx.request.body : null;
        let { flag, data, err } = await store.judgeAdminExist(params);
        let res = null;
        if (data.length) {
            res = {
                data: null,
                ...USER_EXIST,
            };
        } else {
            let { flag, data, err } = await store.regist(params);
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
    login: async (ctx, next) => {
        utils.setHeaders(ctx);
        const params = ctx.request.body ? ctx.request.body : null;
        let res = null;
        let { flag, data: judgeAdminExistData, err } = await store.judgeAdminExist(params);
        if (judgeAdminExistData.length) {
            let { flag, data: judgeAdminPasswordData, err } = await store.judgeAdminPassword(params);
            if (judgeAdminPasswordData.length) {
                let resultData = judgeAdminPasswordData[0];
                let { flag, data: setAccesstokenData, err } = await store.setAccesstoken(resultData);
                const { accesstoken } = setAccesstokenData;
                const { password, ...otherParams } = resultData;
                if (flag) {
                    res = {
                        code: 0,
                        data: {
                            entity: {
                                ...otherParams,
                                accesstoken
                            }
                        }
                    };
                } else {
                    res = {
                        data: null,
                        ...SYS_ERROR,
                    };
                }
            } else {
                res = {
                    data: null,
                    ...LOGIN_PASSWORD_ERROR,
                };
            }
        } else {
            res = {
                data: null,
                ...USER_NOT_EXIST,
            };
        }

        ctx.response.body = res;
    },
    logout: async (ctx, next) => {
        utils.setHeaders(ctx);
        const params = ctx.request.body ? ctx.request.body : null;
        let { flag, err } = await store.back_clearAccesstoken(params);
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
    }

};

module.exports = {
    // 'POST /rabbit/admin/back_update_id': admin.back_update_id,
    'POST /rabbitApi/admin/regist': admin.regist,
    // 'POST /rabbit/admin/back_batch_delete': admin.back_batch_delete,
    'POST /rabbitApi/admin/login': admin.login,
    'POST /rabbitApi/admin/logout': admin.logout
};
