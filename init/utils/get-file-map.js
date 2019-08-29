/** 
 * @component get-sql-file-map.js
 * @description 获取sql文件目录隐射对象
 * @time 2019-08-27 15:46
 * @author fishYu
 */

import walkFile from "./walk-file";

/**
 * 获取目录下的文件对象
 * @param {string} absolutePath  需进行遍历的目录路径
 * @param {string} mineName         遍历文件的后缀名
 * @return {object} 
 */
function getFileMap(absolutePath, mineName) {
    //遍历所有文件
    let fileList = walkFile(absolutePath, mineName);
    return fileList;
}

export default getFileMap;