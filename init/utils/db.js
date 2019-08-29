/**
 * @component db.js
 * @description 数据库连接
 * @time 2019-08-28 10:38
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

export default query;