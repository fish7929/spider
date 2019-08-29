/**
 * @component write.js
 * @description 保存爬取的信息
 * @time 2019-08-28 15:42
 * @author fishYu
 */

import MyMovies from "../models/myMovies";

/**
 * 保存网站爬取的信息
 * @param {array} movies 抓取的网站信息的 对象数组
 */
const write = async (movies) => {
    console.log('movie:write  开始写入电影');
    // movies即为read.js读取出来的结果数组
    for (let movie of movies) {
        // 通过query方法去查询一下是不是已经在数据库里存过了
        const oldMovie = await MyMovies.findMovieByMovieId(movie.movie_id);
        // 直接就进行更新操作了
        if (oldMovie) {
            // 更新movies表里的数据
            const obj = Object.assign({}, movie);
            await MyMovies.updateMovieByMovieId(obj, oldMovie.movie_id);
        } else {  //插入数据
            const obj = Object.assign({}, movie);
            await MyMovies.createMovie(obj);
        }
        console.log(`movie:write  正在写入电影：${movie.name}`);
    }
};

export default write;