/**
 * @component myMovies.js
 * @description 电影的model数据处理层
 * @time 2019-08-29 10:57
 * @author fishYu
 */

import dbUtils from '../utils/dbUtil';

/**
 * 电影数据处理对象
 */
const MyMovies = {
    /**
     * 插入一条电影数据
     * @param {object} model 存储的数据对象
     */
    async createMovie(model) {
        const values = Object.assign({}, model, { create_time: Date.now() });
        const result = await dbUtils.insertData('my_movies', values);
        return result;
    },

    /**
     * 根据电影的id更新该条数据
     * @param {object} model 需要更新的数据对象 
     * @param {string} movieId 电影id
     */
    async updateMovieByMovieId(model, movieId) {
        const values = Object.assign({}, model, { update_time: Date.now() });
        const result = await dbUtils.updateDataByField('my_movies', values, 'movie_id', movieId);
        return result;
    },

    /**
     * 根据电影的id查找该条数据
     * @param {object} model 需要更新的数据对象 
     * @param {string} movieId 电影id
     */
    async findMovieByMovieId(movieId) {
        let result = await dbUtils.findDataByField('my_movies', 'movie_id', movieId);
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result;
    },

    /**
     * 查询所有电影
     */
    async queryAllMovies() {
        const result = await dbUtils.selectAll('my_movies');
        return result;
    },

    /**
     * 查询所有电影,值包含部分字段
     * @param {array} fields 所有的字段数组
     */
    async queryAllMoviesByFields(fields) {
        const result = await dbUtils.selectAimFiled('my_movies', fields);
        return result;
    }
};

export default MyMovies;