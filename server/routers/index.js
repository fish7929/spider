/**
 * @component index.js
 * @description 所有路由的总入口
 * @time 2019-08-28 17:48
 * @author fishYu
 */

import koa2Router from 'koa2-router';
import home from './home';

const router = new koa2Router();

//绑定对应的路由中间件
router.use('/', home);

export default router;