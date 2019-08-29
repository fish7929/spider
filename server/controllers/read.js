/**
 * @component read.js
 * @description 读取web站点数据
 * @time 2019-08-28 14:45
 * @author fishYu
 */

import koa2Req from 'koa2-request';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';  //gb2312 编码数据

/**
 * 处理豆瓣网页的数据
 * @param {object} $ 类似jquery的对象
 * @param {string} host 对应的网站域名
 */
const dealWithDouban = ($, host) => {
    let result = [];    // 结果数组
    // 遍历这些热映电影的li
    $('#screening li.ui-slide-item').each((index, item) => {
        const ele = $(item);
        const name = ele.data('title');
        const score = ele.data('rate') || '暂无评分';
        let source = ele.find('.poster a').attr('href');
        source = source && source.indexOf("http") < 0 ? host + source : source;
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
    return result;
}

/**
 * 处理电影天堂网页的数据
 * @param {object} $ 类似jquery的对象
 * @param {string} host 对应的网站域名
 */
const dealWithDYTT = ($, host) => {
    let result = [];    // 结果数组
    // 遍历这些热映电影的li
    $('#header .bd2 .co_area2 .co_tupian li').each((index, item) => {
        const ele = $(item);
        const name = ele.find('a > p').text();
        const _linkobj = ele.find('a');
        let source = _linkobj.attr('href');
        source = source && source.indexOf("http") < 0 ? host + source : source;
        //处理评分
        let title = _linkobj.attr('title');
        let _ind = title && title.indexOf("分");
        let score = '';
        if (_ind >= 3) { //5.6分
            score = title.substr((_ind - 3), 3);
        } else {
            score = '暂无评分';
        }
        let image = ele.find('img').attr('src');
        // 影片id可以从影片href中获取到
        const movieId = source && source.match(/(\d+)/)[1];
        // 为了防止豆瓣防盗链导致裂图，换成webp格式加载图片
        // image = image && image.replace(/jpg$/, 'webp');
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
    return result;
}

/**
 * 处理bt天堂网页的数据
 * @param {object} $ 类似jquery的对象
 * @param {string} host 对应的网站域名
 */
const dealWithBTTT = ($, host) => {
    let result = [];    // 结果数组
    // 遍历这些热映电影的li
    $('#post_container li.post').each((index, item) => {
        const ele = $(item);
        const _linkObj = ele.find('.article a');
        const name = _linkObj.text();
        const score = ele.data('rate') || '暂无评分';
        let source = _linkObj.attr('href');
        source = source && source.indexOf("http") < 0 ? host + source : source;
        let image = ele.find('.thumbnail img').attr('src');
        // 影片id可以从影片href中获取到
        const movieId = source && source.match(/(\d+)/)[1];
        // 为了防止豆瓣防盗链导致裂图，换成webp格式加载图片
        // image = image && image.replace(/jpg$/, 'webp');
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
    return result;
}

/**
 * 读取网站逻辑
 * @param {object} obj 抓取的网站对象 如{url: 'https://movie.douban.com',  copyright: 'douban'}
 */
const read = async (obj) => {
    const { url, copyright } = obj;
    console.log(`${url} movie:read  开始读取最近上映的电影`);

    const res = await koa2Req({ url: url, encoding: null });  //读取的时候不编码，预防不能解码
    // body为目标页面抓取到的html代码
    // 通过cheerio.load方法可以把html代码转换成可以操作的DOM结构
    let body = res.body;
    //只有电影天堂的 页面是GB2312
    if (copyright === 'dytt') {
        // 将二进制数据解码成 gb2312 编码数据
        body = iconv.decode(body, 'GB2312');
    }
    const $ = cheerio.load(body, { decodeEntities: false });
    let result = [];
    switch (copyright) {
        case 'douban':  //豆瓣
            result = dealWithDouban($, url);    // 结果数组
            break;
        case 'dytt':  //电影天堂
            result = dealWithDYTT($, url);    // 结果数组
            break;
        case 'bttt':  //BT天堂
            result = dealWithBTTT($, url);    // 结果数组
            break;
    }
    // 返回结果数组
    return result;
}

export default read;