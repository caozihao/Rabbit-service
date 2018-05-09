const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const app = new Koa();
// const session = require("koa-session2");
const mysql = require('mysql');
const config = require('./config');
const pool = mysql.createPool(config.mysql);

//使用连接池可以帮助我们更好的管理数据库连接。数据库连接池可以限制连接的最大数量，复用已有的连接等。
pool.getConnection((err) => {
    if (err) {
        console.log('连接数据库失败！-' + err);
    } else {
        console.log('连接数据库成功！');
    }
    console.log(`当前版本号:${config.version}`)
});

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

/*app.use(session({
    key:config.session.SESSION_NAME,
    maxAge: config.session.MAXAGE  //30分钟
}));*/


// app.use(cors());
app.use(bodyParser());
app.use(controller());
app.listen(config.PORT);
console.log('已连接到3000端口！');