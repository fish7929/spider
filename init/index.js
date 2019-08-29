/**
 * @component index.js
 * @description 脚本初始化入口
 * @time 2019-08-27 10:28
 * @author fishYu
 */

import "babel-polyfill";    //为了转换为es5  async 这个的写法处理转换
import getFileContentMap from './utils/get-file-content-map';
import query from './utils/db';

//当前文件目录地址
let basePath = __dirname;
//把所有的\字符全部替换成/
basePath = basePath.replace(/\\/g, '\/');
//转换成数组
let pathArr = basePath.split('\/');

//添加指定的sql文件夹
const sqlPath = pathArr.join('/') + '/sql/';    //需要读取的文件目录
const mineName = 'sql';  //需要读取的文件类型

//获取所有的文件内容列表
const sqlFileContentMap = getFileContentMap(sqlPath, mineName);

/**
 * 打印脚本执行日志
 * @param {boolean} isFail 是否出错
 * @param {string} sqlFile sql脚本文件
 * @param {number} index sql脚本下标
 */
const eventLog = (isFail, sqlFile, index) => {
    if (isFail) {
        console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败 o(╯□╰)o ！`)
    } else {
        console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功 O(∩_∩)O !`)
    }
}
/**
 * 创建表
 */
const createAllTables = async () => {
    //处理所有读取的文件内容
    for (let key in sqlFileContentMap) {
        let sqlShell = sqlFileContentMap[key]
        let sqlShellList = sqlShell.split(';');
        //处理每条sql语句
        for (let [i, shell] of sqlShellList.entries()) {
            if (shell.trim()) {  //处理空格，并且不为空
                let result = await query(shell);
                if (result.serverStatus * 1 === 2) {  //主要判断是否成功
                    eventLog(false, key, i);
                } else {
                    eventLog(true, key, i);
                }
            }
        }
    }
    console.log('sql脚本执行结束！\n请按 ctrl + c 键退出！');
}

createAllTables();
