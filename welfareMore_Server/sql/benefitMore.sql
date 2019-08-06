/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50611
Source Host           : 127.0.0.1:3306
Source Database       : benefitMore

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2019-01-06 18:37:51
*/

SET FOREIGN_KEY_CHECKS=0;

--数据库
drop database benefitMore;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`benefitMore` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `benefitMore`;

-- ----------------------------
-- Records of user 后台用户表
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(100),
  `password` varchar(100) DEFAULT NULL,
  `type` int(1) DEFAULT NULL,
   PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of power 权限表
-- ----------------------------
DROP TABLE IF EXISTS `power`;
CREATE TABLE `power` (
  `type` int(1) COMMENT '职位类型',
  `name` varchar(100) DEFAULT NULL  COMMENT '职位名称',
  `power` varchar(500) DEFAULT NULL  COMMENT '职位可调用接口',
  `des` varchar(500) DEFAULT NULL  COMMENT '职位描述',
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `user` VALUES ('admin', '123123', 1);
INSERT INTO `power` VALUES (1, '超级管理员', 'power#user#check#project#salesman#advert','权限管理，角色管理，审核数据，发起人管理，广告管理');
INSERT INTO `power` VALUES (2, '管理员', 'user','角色管理');
INSERT INTO `power` VALUES (3, '审核员', 'check','审核数据');

-- ----------------------------
-- Table structure for `project`
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `proId` int(11) NOT NULL AUTO_INCREMENT COMMENT '活动id自增',
  `legalManName` varchar(100) DEFAULT NULL  COMMENT '发起人名称',
  `legalManPhone` varchar(11) DEFAULT NULL COMMENT '活动负责人电话',
  `cmpName` varchar(500) DEFAULT NULL COMMENT '发起组织名称',
  `itemName` varchar(100) DEFAULT NULL COMMENT '活动名称',
  `itemDesc` varchar(500) DEFAULT NULL COMMENT '活动简介',
  `itemImg` varchar(100) DEFAULT NULL COMMENT '活动图片1',
  `itemImg2` varchar(100) DEFAULT NULL COMMENT '活动图片2',
  `itemImg3` varchar(100) DEFAULT NULL COMMENT '活动图片3',
  `itemImg4` varchar(100) DEFAULT NULL COMMENT '活动图片4',
  `itemImg5` varchar(100) DEFAULT NULL COMMENT '活动图片5',
  `itemImg6` varchar(100) DEFAULT NULL COMMENT '活动图片6',
  `itemStage` int(1) DEFAULT 0 COMMENT '活动审核阶段',
  `itemType` int(1) DEFAULT NULL COMMENT '活动类型',
  `itemTypeShow` int(1) DEFAULT NULL COMMENT '是否显示活动类型',
  `itemArea` int(11) DEFAULT NULL COMMENT '活动领域',
  `itemAreaShow` int(1) DEFAULT NULL COMMENT '领域',
  `itemMoney` int(1) DEFAULT NULL COMMENT '活动形式',
  `itemMoneyShow` int(1) DEFAULT NULL COMMENT '是否显示活动形式',
  `itemPlace` int(11) DEFAULT NULL COMMENT '活动所在地区',
  `itemPlaceShow` int(1) DEFAULT NULL COMMENT '是否显示活动',
  `businessv1` int(11) DEFAULT NULL COMMENT '一级发起人id',
  `businessv1Show` int(1) DEFAULT NULL COMMENT '是否显示一级发起人',
  `businessv2` int(11) DEFAULT NULL COMMENT '二级发起人id',
  `businessv2Show` int(1) DEFAULT NULL COMMENT '是否显示二级发起人',
  `isTop` int(1) DEFAULT 0 COMMENT '是否置顶',
  `createTime` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`proId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------


-- ----------------------------
-- Table structure for `salesman`
-- ----------------------------
DROP TABLE IF EXISTS `salesman`;
CREATE TABLE `salesman` (
  `salesId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id自增',
  `name` varchar(100) DEFAULT NULL COMMENT '名称',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `weChatId` varchar(100) DEFAULT NULL COMMENT '微信号',
  `major` varchar(20) DEFAULT NULL COMMENT '专业',
  `inWeChatId` int(11) DEFAULT '0' COMMENT '介绍发起人id',
  PRIMARY KEY (`salesId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `salesman` (name, age, phone,email,weChatId,major) VALUES('wechart',18,'13112312311','123123@qq','wechart1','sc');

-- ----------------------------
-- Records of salesman
-- ----------------------------

-- ----------------------------
-- Table structure for `advert`
-- ----------------------------
DROP TABLE IF EXISTS `advert`;
CREATE TABLE `advert` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '广告id自增',
  `title` VARCHAR(100) DEFAULT NULL  COMMENT '广告标题',
  `content` VARCHAR(500) DEFAULT NULL  COMMENT '广告内容',
  `cssid` VARCHAR(100) DEFAULT NULL  COMMENT '广告样式',
  `iconurl` VARCHAR(100) DEFAULT NULL COMMENT '图片地址',
  `backimgurl` VARCHAR(100) DEFAULT NULL COMMENT '背景地址',
  `pagename` VARCHAR(100) DEFAULT NULL COMMENT '跳转页面',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of advert
-- ----------------------------


