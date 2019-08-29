/**
 * @component home.js
 * @description 首页展示的路由
 * @time 2019-08-28 17:50
 * @author fishYu
 */

import koa2Router from 'koa2-router';
import homeRender from '../controllers/homeRender';
//创建路由
const homeRouter = new koa2Router();
//路由定义和指定渲染器
export default homeRouter.get('/', homeRender);