/*
Navicat MySQL Data Transfer

Source Server         : yi
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : gdpj

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-04-16 00:57:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for information_news
-- ----------------------------
DROP TABLE IF EXISTS `information_news`;
CREATE TABLE `information_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '新闻资讯数据id',
  `type` int(11) NOT NULL COMMENT '类型，0最新资讯，1平台公告',
  `name` varchar(255) NOT NULL COMMENT '新闻名称',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `img` varchar(255) DEFAULT NULL COMMENT '封面图片',
  `content` text NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='资讯表：新闻资讯平台公告表information_news';

-- ----------------------------
-- Table structure for information_notice
-- ----------------------------
DROP TABLE IF EXISTS `information_notice`;
CREATE TABLE `information_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recipient_id` int(11) NOT NULL COMMENT '接收人id',
  `name` varchar(255) NOT NULL COMMENT '消息名称',
  `createTime` datetime NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_notice_information_id` (`recipient_id`),
  CONSTRAINT `fk_notice_information_id` FOREIGN KEY (`recipient_id`) REFERENCES `personal_information` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COMMENT='资讯表：消息表information_notice';

-- ----------------------------
-- Table structure for personal_account
-- ----------------------------
DROP TABLE IF EXISTS `personal_account`;
CREATE TABLE `personal_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='个人信息表：账号密码personal_account';

-- ----------------------------
-- Table structure for personal_at_merchant
-- ----------------------------
DROP TABLE IF EXISTS `personal_at_merchant`;
CREATE TABLE `personal_at_merchant` (
  `AU_id` int(11) NOT NULL AUTO_INCREMENT,
  `information_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL COMMENT '商家名称',
  `address` varchar(255) NOT NULL COMMENT '商家地址',
  `Industry` varchar(255) NOT NULL COMMENT '工商营业执照',
  `identity_card_z` varchar(255) NOT NULL COMMENT '身份证照片正面',
  `identity_card_f` varchar(255) NOT NULL COMMENT '身份证反面',
  `identity_num` varchar(255) NOT NULL COMMENT '身份证号码',
  `pass` int(11) NOT NULL DEFAULT '-1',
  `createTime` datetime NOT NULL,
  PRIMARY KEY (`AU_id`),
  KEY `fk_merchant_information_id` (`information_id`) USING BTREE,
  CONSTRAINT `fk_merchant_information_id` FOREIGN KEY (`information_id`) REFERENCES `personal_information` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='个人信息表：商家认证信息表personal_At_merchant';

-- ----------------------------
-- Table structure for personal_at_student
-- ----------------------------
DROP TABLE IF EXISTS `personal_at_student`;
CREATE TABLE `personal_at_student` (
  `AU_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '信息表id',
  `information_id` int(11) DEFAULT NULL COMMENT '与主表personal_information的id存在外键',
  `school` varchar(255) NOT NULL COMMENT '学校名称',
  `major` varchar(255) NOT NULL COMMENT '专业',
  `regular` varchar(255) NOT NULL COMMENT '本科专科',
  `beginTime` varchar(255) NOT NULL COMMENT '学期开始时间',
  `endTime` varchar(255) NOT NULL COMMENT '学期结束时间',
  `student_card` varchar(255) NOT NULL COMMENT '学生证照片',
  `identity_card_z` varchar(255) NOT NULL COMMENT '身份证照片反面',
  `identity_card_f` varchar(255) NOT NULL COMMENT '身份证正面',
  `identity_num` varchar(18) NOT NULL COMMENT '身份证号码',
  `pass` int(11) NOT NULL DEFAULT '-1' COMMENT '-1未审核，0未通过，1通过',
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`AU_id`),
  UNIQUE KEY `u_identity_num` (`identity_num`),
  KEY `fk_student_information_id` (`information_id`) USING BTREE,
  CONSTRAINT `fk_student_information_id` FOREIGN KEY (`information_id`) REFERENCES `personal_information` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='个人信息表：学生认证信息表personal_At_student';

-- ----------------------------
-- Table structure for personal_collection
-- ----------------------------
DROP TABLE IF EXISTS `personal_collection`;
CREATE TABLE `personal_collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `information_id` int(11) DEFAULT NULL,
  `shou_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_collection_information_infor` (`information_id`),
  KEY `fk_collection_information_shou` (`shou_id`),
  CONSTRAINT `fk_collection_information_shou` FOREIGN KEY (`shou_id`) REFERENCES `task_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_collection_information_infor` FOREIGN KEY (`information_id`) REFERENCES `personal_information` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='收藏职位表personal_collection';

-- ----------------------------
-- Table structure for personal_experience
-- ----------------------------
DROP TABLE IF EXISTS `personal_experience`;
CREATE TABLE `personal_experience` (
  `EP_id` int(11) NOT NULL AUTO_INCREMENT,
  `information_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL COMMENT '公司名称',
  `begin_time` date NOT NULL,
  `end_time` date NOT NULL COMMENT '结束时间',
  `content` text NOT NULL COMMENT '工作内容',
  PRIMARY KEY (`EP_id`),
  KEY `fk_experience_information` (`information_id`),
  CONSTRAINT `fk_experience_information` FOREIGN KEY (`information_id`) REFERENCES `personal_information` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='个人信息表：工作经验personal_experience';

-- ----------------------------
-- Table structure for personal_explain
-- ----------------------------
DROP TABLE IF EXISTS `personal_explain`;
CREATE TABLE `personal_explain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `information_id` int(11) DEFAULT NULL,
  `evaluate` text COMMENT '自我评价',
  `Business_brief` text COMMENT '商家简介',
  `Business_address` text COMMENT '商家地址',
  PRIMARY KEY (`id`),
  KEY `fk_explain_information_id` (`information_id`),
  CONSTRAINT `fk_explain_information_id` FOREIGN KEY (`information_id`) REFERENCES `personal_information` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='个人信息表：说明表personal_explain';

-- ----------------------------
-- Table structure for personal_information
-- ----------------------------
DROP TABLE IF EXISTS `personal_information`;
CREATE TABLE `personal_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ac_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL COMMENT '个人姓名，可重复',
  `age` int(11) DEFAULT '1' COMMENT '年龄',
  `sex` char(2) NOT NULL DEFAULT '男',
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '人物类型，默认0，1商家，2学生',
  `createTime` datetime NOT NULL,
  `head_img` varchar(255) DEFAULT NULL,
  `praise` int(11) DEFAULT NULL COMMENT '好评率',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0为正常，1为警告，2为禁封',
  PRIMARY KEY (`id`),
  UNIQUE KEY `u_phone` (`phone`),
  UNIQUE KEY `u_email` (`email`),
  KEY `fk_information_accounr_id` (`ac_id`),
  CONSTRAINT `fk_information_accounr_id` FOREIGN KEY (`ac_id`) REFERENCES `personal_account` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='个人信息表：主表personal_information';

-- ----------------------------
-- Table structure for personal_log
-- ----------------------------
DROP TABLE IF EXISTS `personal_log`;
CREATE TABLE `personal_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `information_id` int(11) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `content` varchar(255) NOT NULL COMMENT '操作原因',
  `createTime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `log_information_id` (`information_id`),
  KEY `log_taskList_id` (`task_id`),
  CONSTRAINT `log_taskList_id` FOREIGN KEY (`task_id`) REFERENCES `task_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `log_information_id` FOREIGN KEY (`information_id`) REFERENCES `personal_information` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='个人信息表：操作日志表personal_log';

-- ----------------------------
-- Table structure for personal_untask
-- ----------------------------
DROP TABLE IF EXISTS `personal_untask`;
CREATE TABLE `personal_untask` (
  `Untask_id` int(11) NOT NULL AUTO_INCREMENT,
  `information_id` int(11) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`Untask_id`),
  KEY `fk_untask_information` (`information_id`),
  KEY `fk_untask_tasklist` (`task_id`),
  CONSTRAINT `fk_untask_information` FOREIGN KEY (`information_id`) REFERENCES `personal_information` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_untask_tasklist` FOREIGN KEY (`task_id`) REFERENCES `task_list` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='个人信息表：已接任务表personal_Untask';

-- ----------------------------
-- Table structure for task_apply
-- ----------------------------
DROP TABLE IF EXISTS `task_apply`;
CREATE TABLE `task_apply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list_id` int(11) DEFAULT NULL COMMENT '与任务表id存在外键',
  `apply_id` int(11) DEFAULT NULL COMMENT '申请人id',
  `result` int(11) NOT NULL DEFAULT '-1' COMMENT '是否申请成功，0未成功，1成功,-1审核中',
  PRIMARY KEY (`id`),
  KEY `fk_apply_list` (`list_id`),
  KEY `fk_apply_information` (`apply_id`),
  CONSTRAINT `fk_apply_information` FOREIGN KEY (`apply_id`) REFERENCES `personal_information` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_apply_list` FOREIGN KEY (`list_id`) REFERENCES `task_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='任务表：任务申请表task_apply';

-- ----------------------------
-- Table structure for task_evaluate
-- ----------------------------
DROP TABLE IF EXISTS `task_evaluate`;
CREATE TABLE `task_evaluate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list_id` int(11) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL COMMENT '评价人id',
  `person_name` varchar(255) DEFAULT NULL,
  `branch` int(11) NOT NULL COMMENT '分数',
  `content` text,
  `createtime` datetime NOT NULL COMMENT '评价时间',
  PRIMARY KEY (`id`),
  KEY `fk_evaluate_informatin` (`person_id`),
  KEY `fk_evaluate_list` (`list_id`),
  CONSTRAINT `fk_evaluate_informatin` FOREIGN KEY (`person_id`) REFERENCES `personal_information` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_evaluate_list` FOREIGN KEY (`list_id`) REFERENCES `task_list` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='任务表：任务评价表task_evaluate';

-- ----------------------------
-- Table structure for task_list
-- ----------------------------
DROP TABLE IF EXISTS `task_list`;
CREATE TABLE `task_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `release_id` int(11) DEFAULT NULL COMMENT '发布者id，与主表personal_information的id存在外键',
  `type` int(11) DEFAULT NULL COMMENT '职位类别',
  `address_city` varchar(11) NOT NULL COMMENT '区域id',
  `address_name` varchar(255) NOT NULL COMMENT '区域名字',
  `name` varchar(255) NOT NULL COMMENT '任务名称',
  `number` int(11) NOT NULL COMMENT '所需人数',
  `money` int(11) NOT NULL COMMENT '价格',
  `cycle` varchar(255) NOT NULL COMMENT '结算周期',
  `begin_time` datetime NOT NULL COMMENT '任务开始时间',
  `end_time` datetime NOT NULL COMMENT '任务结束时间',
  `describe` text NOT NULL COMMENT '职位描述',
  `requirement` text NOT NULL COMMENT '职位要求',
  `Specific_address` varchar(255) NOT NULL COMMENT '工作地址',
  `status` int(11) NOT NULL COMMENT '任务状态，0为进行中，1为结束',
  `lower` int(11) NOT NULL DEFAULT '0' COMMENT '任务状态，0为正常，-1为禁止',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `fk_tasklist_information` (`release_id`),
  KEY `fk_tasklist_type` (`type`),
  CONSTRAINT `fk_tasklist_information` FOREIGN KEY (`release_id`) REFERENCES `personal_information` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_tasklist_type` FOREIGN KEY (`type`) REFERENCES `task_type` (`typeId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='任务表：任务表task_list';

-- ----------------------------
-- Table structure for task_score
-- ----------------------------
DROP TABLE IF EXISTS `task_score`;
CREATE TABLE `task_score` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `information_id` int(11) DEFAULT NULL,
  `totalScore` int(11) DEFAULT '0',
  `number` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_score_information_id` (`information_id`),
  CONSTRAINT `fk_score_information_id` FOREIGN KEY (`information_id`) REFERENCES `personal_information` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='分数计算表task_score';

-- ----------------------------
-- Table structure for task_type
-- ----------------------------
DROP TABLE IF EXISTS `task_type`;
CREATE TABLE `task_type` (
  `typeId` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) NOT NULL,
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='任务表：任务评价表task_type';
DROP TRIGGER IF EXISTS `add_information`;
DELIMITER ;;
CREATE TRIGGER `add_information` AFTER INSERT ON `personal_account` FOR EACH ROW BEGIN
	INSERT INTO personal_information(id,ac_id,name,createTime,head_img,praise,status) VALUES (null,new.id,new.username,CURRENT_TIMESTAMP(),"/upload/img/headPortrait/tou.jpg",100,0);
END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `add_score`;
DELIMITER ;;
CREATE TRIGGER `add_score` AFTER INSERT ON `personal_information` FOR EACH ROW BEGIN
	INSERT INTO task_score(id,information_id,totalScore,number) VALUES (null,new.id,0,0);
END
;;
DELIMITER ;
