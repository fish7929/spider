/**
 * @component dbUtil.js
 * @description 数据库操作的工具类
 * @time 2019-08-28 11:46
 * @author fishYu
 */

import mysql from "mysql";
import config from "../../config";

const { database } = config;
//数据库链接池的配置
const dbPoolConfig = {
    host: database.HOST,
    user: database.USERNAME,
    password: database.PASSWORD,
    database: database.DATABASE,
    acquireTimeout: 15000, // 连接超时时间
    connectionLimit: 100, // 最大连接数
    waitForConnections: true, // 超过最大连接时排队
    queueLimit: 0, // 排队最大数量(0 代表不做限制)
};
//创建数据库链接池
const pool = mysql.createPool(dbPoolConfig);

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        //建立连接
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                resolve(err);
            } else {
                //执行数据操作
                connection.query(sql, values, (error, rows) => {
                    if (error) {
                        console.log(error)
                        reject(error);
                    } else {
                        resolve(rows);
                    }
                    //释放链接池
                    connection.release();
                });
            }
        });
    });
};

/**
 * 创建表
 * @param {string} sql sql执行语句
 */
const createTable = (sql) => {
    return query(sql, []);
};

/**
 * 根据id查找数据
 * @param {string} table 表名
 * @param {number} id 数据对应的id值
 */
const findDataById = (table, id) => {
    const _sql = "SELECT * FROM ?? WHERE id = ?"
    return query(_sql, [table, id]);
}

/**
 * 根据传入的字段查找数据
 * @param {string} table 表名
 * @param {string} fieldName 需要筛选的字段名称
 * @param {any} fieldVal 对应字段对应的值
 */
const findDataByField = (table, fieldName, fieldVal) => {
    const _sql = "SELECT * FROM ?? WHERE ?? = ? LIMIT 1"
    return query(_sql, [table, fieldName, fieldVal]);
}

/**
 * 按页数查找数据
 * @param {string} table 表名
 * @param {array} keys 需要查询的字段数组 如：['username', 'email']
 * @param {number} start 起始条数
 * @param {number} end 截止条数
 */
const findDataByPage = (table, keys, start, end) => {
    const _sql = "SELECT ?? FROM ??  LIMIT ? , ?"; //标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ），除此之外，用一个 ? 做占位符，可以将标识符的名字当成 query 变量一起传进值列表中
    return query(_sql, [keys, table, start, end]);
}

/**
 * 插入数据
 * @param {string} table 表名
 * @param {object} values 需要插入的数据对象 如：{mobile: 12345678910, name: 'test'}
 */
const insertData = (table, values) => {
    const _sql = "INSERT INTO ?? SET ?"; //标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ），除此之外，用一个 ? 做占位符，可以将标识符的名字当成 query 变量一起传进值列表中
    return query(_sql, [table, values]);
}

/**
 * 根据id更新数据
 * @param {string} table 表名
 * @param {object} values 需要插入的数据对象 如：{mobile: 12345678910, name: 'test'}
 * @param {number} id 数据对应的id值
 */
const updateDataById = (table, values, id) => {
    const _sql = "UPDATE ?? SET ? WHERE id = ?"; //标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ），除此之外，用一个 ? 做占位符，可以将标识符的名字当成 query 变量一起传进值列表中
    return query(_sql, [table, values, id]);
}

/**
 * 根据传入的字段更新数据
 * @param {string} table 表名
 * @param {object} values 需要插入的数据对象 如：{mobile: 12345678910, name: 'test'}
 * @param {string} fieldName 需要筛选的字段名称
 * @param {any} fieldVal 对应字段对应的值
 */
const updateDataByField = (table, values, fieldName, fieldVal) => {
    const _sql = "UPDATE ?? SET ? WHERE ?? = ?"; //标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ），除此之外，用一个 ? 做占位符，可以将标识符的名字当成 query 变量一起传进值列表中
    return query(_sql, [table, values, fieldName, fieldVal]);
}

/**
 * 根据id删除数据
 * @param {string} table 表名
 * @param {number} id 数据对应的id值
 */
const deleteDataById = (table, id) => {
    const _sql = "DELETE FROM ?? WHERE id = ?"; //标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ），除此之外，用一个 ? 做占位符，可以将标识符的名字当成 query 变量一起传进值列表中
    return query(_sql, [table, id]);
}

/**
 * 根据对应的字段删除数据
 * @param {string} table 表名
 * @param {string} fieldName 需要筛选的字段名称
 * @param {any} fieldVal 对应字段对应的值
 */
const deleteDataByFeild = (table, fieldName, fieldVal) => {
    const _sql = "DELETE FROM ?? WHERE ?? = ?"; //标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ），除此之外，用一个 ? 做占位符，可以将标识符的名字当成 query 变量一起传进值列表中
    return query(_sql, [table, fieldName, fieldVal]);
}

/**
 * 全表查询,相应的字段值
 * @param {string} table 表名
 * @param {array} keys 需要查询的字段数组 如：['username', 'email']
 */
const selectAimFiled = (table, keys) => {
    const _sql = "SELECT ?? FROM ?? "; //标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ），除此之外，用一个 ? 做占位符，可以将标识符的名字当成 query 变量一起传进值列表中
    return query(_sql, [keys, table]);
}

/**
 * 全表查询
 * @param {string} table 表名
 */
const selectAll = (table) => {
    const _sql = "SELECT * FROM ?? "; //标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ），除此之外，用一个 ? 做占位符，可以将标识符的名字当成 query 变量一起传进值列表中
    return query(_sql, [table]);
}

/**
 * 全表计数统计
 * @param {string} table 表名
 */
const count = (table) => {
    const _sql = "SELECT COUNT(*) AS total_count FROM ?? "; //标识符（数据库、表、列名）用两个 ? 做占位符（即 ?? ），除此之外，用一个 ? 做占位符，可以将标识符的名字当成 query 变量一起传进值列表中
    return query(_sql, [table]);
}

export default {
    query,
    createTable,
    insertData,
    updateDataById,
    updateDataByField,
    findDataById,
    findDataByField,
    findDataByPage,
    selectAll,
    selectAimFiled,
    deleteDataById,
    deleteDataByFeild,
    count,
};