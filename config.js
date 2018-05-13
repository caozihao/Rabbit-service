/**
 * @Author:CaoZiHao
 * @description:
 * @Date:2017/5/8
 * @Time:15:56
 */
const config = {
    version: '0.2.2',
    mysql: {
        host: "127.0.0.1",  //主机
        user: "root", //账号
        password: "",//密码
        port: "3306", //端口号
        database: "rabbit"
    },
    /*    redis:{
            port: 6379,
            host: '127.0.0.1',
            family: 4,
            password: 'root1234',
            db: 0
        },
        session:{
            SESSION_NAME:"MO9_BK_JERBOA_SESSIONID", //session名称
            MAXAGE:1000 * 60 * 30, //最大超时
            INTERFACE_SERVICE:"http://192.168.1.57:8280/fortress/sso/api/v1" //请求接口地址
        },*/
    // VALIDATE_INTERFACE_SERVICE: "http://192.168.1.57:8280/fortress/sso/api/v1",
    PROJECTID: 12,
    PORT: 3000
    // SERVICE:'http://localhost' //发布的服务器ip地址,

};

module.exports = config;