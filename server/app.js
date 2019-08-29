/**
 * @component app.js
 * @description 应用入口
 * @time 2019-08-28 16:49
 * @author fishYu
 */

import "babel-polyfill";    //为了转换为es5  async 这个的写法处理转换
import path from 'path';
import Koa2 from "koa2";
import koa2Cors from "koa2-cors";
import koaStatic from "koa-static";
import koaViews from "koa-views";
import koaLogger from "koa-logger";
import bodyParser from "koa-bodyparser";
import koaCompress from "koa-compress";

import config from "../config";
import routers from "./routers/index";

const { port } = config;

//创建应用
const app = new Koa2();
// 配置控制台日志中间件
app.use(koaLogger());
// 配置ctx.body解析中间件
app.use(bodyParser({
    jsonLimit: '2mb',  //最大值
    formLimit: '2mb',   //最大值
    textLimit: '1mb',   //最大值
}));
//设置跨域
app.use(koa2Cors());
//开启gizp  压缩
const options = { threshold: 2048 };  // 阀值，当数据超过2kb的时候，可以压缩
app.use(koaCompress(options));
// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, '../public')));
// 配置服务端模板渲染引擎中间件
app.use(koaViews(path.join(__dirname, './views'), {
    extension: 'ejs'
}));
// 初始化路由中间件
app.use(routers)
// 监听启动端口
app.listen(port, () => {
    console.log(`the server is start at port ${port}`);
});
//监听系统错误
app.on('error', (err, ctx) => {
    console.log(err);
})