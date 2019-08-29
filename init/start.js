/** 
 * @component start.js
 * @description es6 转换 es5 入口   为了 处理  import 导入的写法
 * @time 2019-08-27 15:25
 * @author fishYu
 */

require('babel-register')({
    presets: ['env']
});

module.exports = require('./index.js');