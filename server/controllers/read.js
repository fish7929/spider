/**
 * @component read.js
 * @description 读取web站点数据
 * @time 2019-08-28 14:45
 * @author fishYu
 */

import koa2Req from 'koa2-request';
import cheerio from 'cheerio';

/**
 * 读取网站逻辑
 * @param {string} url 抓取的网站
 */
const read = async (url) => {
    console.log("movie:read  开始读取最近上映的电影");
    const res = await koa2Req(url);
    // body为目标页面抓取到的html代码
    // 通过cheerio.load方法可以把html代码转换成可以操作的DOM结构
    const $ = cheerio.load(res.body);
    let result = [];    // 结果数组
    // 遍历这些热映电影的li
    $('#screening li.ui-slide-item').each((index, item) => {
        const ele = $(item);
        const name = ele.data('title');
        const score = ele.data('rate') || '暂无评分';
        const source = ele.find('.poster a').attr('href');
        let image = ele.find('img').attr('src');
        // 影片id可以从影片href中获取到
        const movieId = source && source.match(/(\d+)/)[1];
        // 为了防止豆瓣防盗链导致裂图，换成webp格式加载图片
        image = image && image.replace(/jpg$/, 'webp');
        if (!name || !image || !source) {
            return;
        }
        result.push({
            name,
            score,
            source,
            image,
            'movie_id': movieId  //为了同步数据库字段
        });
        console.log(`movie:read  正在读取电影：${name}`);
    });
    // 返回结果数组
    return result;
}

export default read;