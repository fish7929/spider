CREATE TABLE IF NOT EXISTS `my_movies` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `movie_id` VARCHAR(100) DEFAULT NULL COMMENT '电影id',
    `name` VARCHAR(100) DEFAULT NULL COMMENT '电影名称',
    `image` VARCHAR(200) DEFAULT NULL COMMENT '电影缩略图',
    `source` VARCHAR(200) DEFAULT NULL COMMENT '电影资源链接',
    `score` VARCHAR(5) DEFAULT NULL COMMENT '电影评分',
    `create_time` VARCHAR(20) DEFAULT NULL COMMENT '创建时间',
    `update_time` VARCHAR(20) DEFAULT NULL COMMENT '更新时间',
    `ext_info` LONGTEXT DEFAULT NULL COMMENT '拓展字段',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;