/**
 * @component startApp.js
 * @description es6 转换 es5 入口   为了 处理  import 导入的写法
 * @time 2019-08-28 17:26
 * @author fishYu
 */

require('babel-register')({
    presets: ['env']
});

module.exports = require('./app.js');