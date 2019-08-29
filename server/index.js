/**
 * @component index.js
 * @description 爬虫的入口文件
 * @time 2019-08-28 15:23
 * @author fishYu
 */

import "babel-polyfill";    //为了转换为es5  async 这个的写法处理转换
import read from "./controllers/read";
import write from "./controllers/write";

const url = 'https://movie.douban.com'; // 目标页面

(async () => {
    // 异步抓取目标页面
    const movies = await read(url);
    // 写入数据到数据库
    await write(movies);
    console.log("抓取数据结束！！！");
    // 完毕后退出程序
    process.exit();
})();