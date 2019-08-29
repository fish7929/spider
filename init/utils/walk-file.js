/** 
 * @component walk-file.js
 * @description 遍历目录下的文件目录工具
 * @time 2019-08-27 14:37
 * @author fishYu
 */

import fs from "fs";

/**
 * 遍历目录下的文件目录
 * @param {string} pathResolve  需进行遍历的目录路径
 * @param {string} mine         遍历文件的后缀名
 * @return {object}             返回遍历后的目录结果
 */
const walkFile = function (pathResolve, mine) {
    const files = fs.readdirSync(pathResolve);
    let fileList = {};
    //entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。
    //迭代对象中数组的索引值作为 key， 数组元素作为 value。
    for (let [i, item] of files.entries()) {
        const itemArr = item.split('\.');
        const len = itemArr.length;
        const itemMine = (len > 1) ? itemArr[len - 1] : 'undefined';
        if (itemMine === mine) {
            fileList[item] = pathResolve + item;
        }
    }
    return fileList;
};

export default walkFile;