const crypto = require('crypto');
const config = require('./../config');
const fetch = require('node-fetch');
// const Store  = require("./store");
// const redisStore = new Store();
const Mo9SSO = require("mo9-sso");
// const Mo9SSO = require("./mo9-sso");
const mo9SSO = new Mo9SSO();

const utils = {
    md5: (encryptString) => {
        const hasher = crypto.createHash("md5");
        hasher.update(encryptString);
        encryptString = hasher.digest('hex');
        return encryptString;
    },
    setHeaders: (ctx) => {
        /*        const origin = ctx.request.headers.origin;*/
        //设置能访问的ip地址
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set('Access-Control-Allow-Credentials', "true");
    },

    // mo9SSODealData:async(params,ctx)=>{
    //     console.log("params ->",params);
    //     const { interface,userId }  =  params;
    //     const queryParams = {
    //         url:`${config.VALIDATE_INTERFACE_SERVICE}/get_user_privileges`,
    //         queryParams: {
    //             userId,
    //             interface,
    //             projectId:config.PROJECTID
    //         },
    //     };
    //      return  mo9SSO.judgeTicket(queryParams);

    //     //获得了session。保存到redis
    //     // if(data){
    //     //     const { session } = data;
    //     //     const sid = await redisStore.set(session, { });
    //     //     ctx.cookies.set(config.session.SESSION_NAME, sid);
    //     // }
    // }

};

module.exports = utils;