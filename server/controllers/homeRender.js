/**
 * @component homeRender.js
 * @description 首页渲染逻辑
 * @time 2019-08-28 17:56
 * @author fishYu
 */

import MyMovies from "../models/myMovies";

/**
 * 首页渲染器
 * @param {object} ctx 访问的上下文环境
 */
const render = async (ctx) => {
    // 通过SQL查询语句拿到库里的movies表数据
    const fields = ['name', 'source', 'score', 'image'];
    const movies = await MyMovies.queryAllMoviesByFields(fields);
    // console.log(movies[0], movies.length, 9999);
    //第一个参数为模板路径  views/index.ejs, 第二个为参数 options对象参数
    await ctx.render('index', {
        title: '正在热映的电影',
        movies,
    })
};
export default render;