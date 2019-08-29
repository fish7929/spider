/**
 * @component get-file-content-map.js
 * @description 获取文件目录下所有文件内容的映射
 * @time 2019-08-27 15:49
 * @author fishYu
 */

import fs from 'fs';
import getFileMap from './get-file-map';

const fileContentMap = {};  //文件内容对象
/**
 * 获取文件内容对象
 * @param {string} fileName 文件名称
 * @param {string} path 文件路径
 * @return {object} 文件内容对象
 */
function getFileContent(fileName, path) {
    const content = fs.readFileSync(path, 'utf8');
    fileContentMap[fileName] = content;
}

/**
 * 所有文件内容对象
 * @param {string} absolutePath  需进行遍历的目录路径
 * @param {string} mineName         遍历文件的后缀名
 * @return {object}
 */
function getFileContentMap(absolutePath, mineName) {
    const fileMap = getFileMap(absolutePath, mineName);
    for (let key in fileMap) {
        getFileContent(key, fileMap[key])
    }
    return fileContentMap;
}

export default getFileContentMap;