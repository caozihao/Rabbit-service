/**
 * @Author:CaoZiHao
 * @description:
 * @Date:2017/5/8
 * @Time:15:36
 */
const fs = require('fs');

// add url-route in /controllers:

const addMapping = (router, mapping)=> {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        }
    }
}

const  addControllers =(router, dir)=> {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

module.exports = function (dir) {
    const controllers_dir = dir || 'controllers';
    const router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};