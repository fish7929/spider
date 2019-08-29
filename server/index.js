/**
 * @component index.js
 * @description 爬虫的入口文件
 * @time 2019-08-28 15:23
 * @author fishYu
 */

import "babel-polyfill";    //为了转换为es5  async 这个的写法处理转换
import read from "./controllers/read";
import write from "./controllers/write";

const urls = [
    {
        url: 'https://movie.douban.com',  //豆瓣
        copyright: 'douban'
    },
    {
        url: 'https://www.dygod.net',  //电影天堂
        copyright: 'dytt'
    },
    {
        url: 'https://www.bttiantangok.com',   //bt天堂
        copyright: 'bttt'
    }
];

(async () => {
    const len = urls.length;
    if (len > 0) {
        for (let i = 0; i < len; i++) {
            const item = urls[i];
            // 异步抓取目标页面
            const movies = await read(item);
            // 写入数据到数据库
            await write(movies);
        }
    }
    console.log("抓取数据结束！！！");
    // 完毕后退出程序
    process.exit();
})();