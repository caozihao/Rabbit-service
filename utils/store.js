/*const Redis = require("ioredis");
const { Store } = require("koa-session2");
const config  = require("./../config");*/


/*class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis();
    }

    async get(sid) {
        console.log(`获取${config.session.SESSION_NAME}...`);
        let data = await this.redis.get(`${config.session.SESSION_NAME}:${sid}`);
        return JSON.parse(data);
    }

    async set(session, opts) {
        try {
            console.log(`设置${config.session.SESSION_NAME}...`);
            if(!opts.sid) {
                opts.sid = this.getID(24);
            }
            await this.redis.set(`${config.session.SESSION_NAME}:${opts.sid}`, JSON.stringify(session));
            return opts.sid;
        }catch (e){
            console.log("e ->",e);
        }
    }

    async destroy(sid) {
        return await this.redis.del(`${config.session.SESSION_NAME}:${sid}`);
    }
}

module.exports = RedisStore;*/
