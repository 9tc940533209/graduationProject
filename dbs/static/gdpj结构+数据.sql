/*
Navicat MySQL Data Transfer

Source Server         : yi
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : gdpj

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2019-06-02 16:45:26
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
-- Records of information_news
-- ----------------------------
INSERT INTO `information_news` VALUES ('3', '1', '本平台励志为大学生提供优质兼职服务平台！', '2019-05-11 01:04:21', '/upload/img/messageImg/messageImg_201905110103445cd5aef0edb2b.jpg', '<h1>本平台励志为大学生提供优质兼职服务平台！</h1><h2>本平台励志为大学生提供优质兼职服务平台！</h2><ul><li><span class=\"ql-size-large\">本平台励志为大学生提供优质兼职服务平台！</span></li><li><span style=\"color: rgb(230, 0, 0);\">本平台励志为大学生提供优质兼职服务平台！</span></li><li><span style=\"color: rgb(102, 61, 0);\">本平台励志为大学生提供优质兼职服务平台！</span></li></ul><p><br></p><p><br></p>');
INSERT INTO `information_news` VALUES ('4', '0', '本人亲身经历告诉大家日挣30元的小兼职打字真相,操作流程', '2019-05-11 01:06:57', '/upload/img/messageImg/messageImg_201905110106555cd5afaf018c4.jpg', '<p><strong style=\"color: rgb(85, 85, 85);\">最近一些朋友在网上一些论坛、还有58同城、赶集网、百姓网、英才网等看到很多招淘宝客服兼职、打字员兼职、在家兼职的招聘信息，很多人纳闷，这些实际为打字员兼职是不是骗子？可以赚到钱吗？小编 以亲身经历来教你鉴别真假！也给想找工作或找兼职的朋友们一些识别技巧。今日小编为大家详细分析网络骗局和正规兼职平台的区别，打字员兼职赚钱怎么做？新手刷单一天能赚多少钱？</strong></p><p><strong style=\"color: rgb(229, 51, 51);\">	</strong><strong style=\"color: rgb(255, 0, 0);\">	<img src=\"http://nrsfh.com/attachment/editor/201812/1546152578hzxsf.jpg\"></strong></p><p><strong style=\"color: rgb(0, 153, 0);\">记者在搜刮软件输出“收集兼职”发明，很多收集兼职网站所传播鼓吹的待遇极其迷人。以兼职打字员为例，在网上就能够找到“130元/万字”、“4000元/月”、“150元/天”等，且职位请求不高：会电脑打字，懂WORD软件，看似很熟悉正规打字兼职QQ公众号 能打字赚钱的平台赚米公众号有哪些的广告语，这样的网上打字员兼职是真的吗？让人很难捉摸。小说录入员1000字30元是不是真的吗？打字挣钱app有哪些？&nbsp;</strong>未来最好的生意，流动的店铺，流动的老板！人就是门面，嘴就是营业的窗口，缘分就是顾客，生意就在游山玩水间接洽，成交就在谈笑风生中水起！你若有缘，你就可以早点成为赢家，你若看不起，就只能在家独守空店房，继续看不起，永远来不及！趋势绝对不会在等所有人都叫好的时候才来，而奇迹总是在不认可声中产生，没有最好，只有更好，赶紧行动！</p><p><br></p><p>诚招网上兼职打字员，事情轻松，在规定光阴内实现，一万字2000元， 预支人为，待遇优厚!打字员短时间招收，人为月结，名额有限 在家事情 多劳多得，</p><p>诚聘收集兼职打字录入员，光阴，地域不限，能上彀便可事情!中文1万字1000元，多劳多得!可在家事情，待遇优厚!</p><p>诚聘兼职打字员，光阴，地域不限，会打字便可事情!1万字1000元收集兼职打字员，兼职打字员雇用多劳多得，可预支人为!概况请接洽...</p><p><br></p><p>请看最近的一条新闻：</p><p>２０１４年１２月，银川市公安局受理了一路收集欺骗案件。银川市一市民在互联网上看到“高薪雇用兼职打字员”的雇用告白后，随即接洽告白宣布者。在交纳了5万元所谓的“包管金”“窃密金”后，告白宣布者就再也接洽不上。接报后，银川市公安局建立专案组并在长沙市将３男１女四名犯罪嫌疑人一举抓获。经审判，犯罪嫌疑人交卸其应用赶集网宣布虚伪高薪雇用兼职打字员的告白，以收取包管金、窃密金为由停止欺骗。（据新华社新闻）</p>');

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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COMMENT='资讯表：消息表information_notice';

-- ----------------------------
-- Records of information_notice
-- ----------------------------
INSERT INTO `information_notice` VALUES ('44', '23', '认证信息', '2019-05-10 23:45:51', '恭喜您，您的认证信息已通过！');
INSERT INTO `information_notice` VALUES ('45', '24', '认证信息', '2019-05-11 00:01:20', '恭喜您，您的认证信息已通过！');
INSERT INTO `information_notice` VALUES ('46', '26', '账号处罚', '2019-05-11 00:18:44', '您的账号已警告，原因：测试警告');
INSERT INTO `information_notice` VALUES ('47', '27', '账号处罚', '2019-05-11 00:19:04', '您的账号已禁封，原因：测试封号 =');
INSERT INTO `information_notice` VALUES ('49', '32', '认证信息', '2019-05-11 00:52:10', '恭喜您，您的认证信息已通过！');
INSERT INTO `information_notice` VALUES ('50', '28', '申请任务成功！', '2019-05-11 00:53:18', '恭喜你,你申请的兼职 —— 售后客服专员,雇主已选中你，请等待雇主联系！');
INSERT INTO `information_notice` VALUES ('51', '25', '认证信息', '2019-05-11 01:09:04', '您的信息认证未通过，原因：身份证不合规');
INSERT INTO `information_notice` VALUES ('52', '40', '账号处罚', '2019-05-30 22:13:31', '您的账号已禁封，原因：测试封禁');
INSERT INTO `information_notice` VALUES ('53', '40', '账号处罚', '2019-05-30 22:47:26', '您的账号已禁封，原因：啊啊啊');
INSERT INTO `information_notice` VALUES ('56', '28', '认证信息', '2019-06-01 11:10:46', '恭喜您，您的认证信息已通过！');

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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COMMENT='个人信息表：账号密码personal_account';

-- ----------------------------
-- Records of personal_account
-- ----------------------------
INSERT INTO `personal_account` VALUES ('22', '18839651400', '698d51a19d8a121ce581499d7b701668', '2019-05-10 23:35:10');
INSERT INTO `personal_account` VALUES ('23', '18839651401', '698d51a19d8a121ce581499d7b701668', '2019-05-10 23:55:14');
INSERT INTO `personal_account` VALUES ('24', '18839651402', '698d51a19d8a121ce581499d7b701668', '2019-05-11 00:17:36');
INSERT INTO `personal_account` VALUES ('25', '18839651403', '698d51a19d8a121ce581499d7b701668', '2019-05-11 00:17:48');
INSERT INTO `personal_account` VALUES ('26', '18839651404', '698d51a19d8a121ce581499d7b701668', '2019-05-11 00:17:59');
INSERT INTO `personal_account` VALUES ('28', '18839651473', '698d51a19d8a121ce581499d7b701668', '2019-05-11 00:19:31');
INSERT INTO `personal_account` VALUES ('30', '18839651405', '698d51a19d8a121ce581499d7b701668', '2019-05-11 00:40:55');
INSERT INTO `personal_account` VALUES ('31', '18839651409', '698d51a19d8a121ce581499d7b701668', '2019-05-11 00:41:23');
INSERT INTO `personal_account` VALUES ('32', '18839651410', '698d51a19d8a121ce581499d7b701668', '2019-05-11 00:48:52');
INSERT INTO `personal_account` VALUES ('33', '111', '698d51a19d8a121ce581499d7b701668', '2019-05-11 08:35:04');
INSERT INTO `personal_account` VALUES ('34', '18839651474', '698d51a19d8a121ce581499d7b701668', '2019-05-11 09:04:35');
INSERT INTO `personal_account` VALUES ('40', 'o5KU340_rgIFcHgjJcNtMjkY-6m4', '11111111', '2019-05-30 17:23:41');
INSERT INTO `personal_account` VALUES ('41', 'o5KU344qKDU1QqkFdOhEc1D5tJGk', '11111111', '2019-05-30 22:12:17');
INSERT INTO `personal_account` VALUES ('42', '1111', '698d51a19d8a121ce581499d7b701668', '2019-06-02 15:55:14');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='个人信息表：商家认证信息表personal_At_merchant';

-- ----------------------------
-- Records of personal_at_merchant
-- ----------------------------
INSERT INTO `personal_at_merchant` VALUES ('4', '23', '黄焖鸡米饭', '河南省驻马店市驿城区健康路北(驻马店市商务局第三家属院附近)', '/upload/img/industry/industry_201905102344565cd59c78aa662.jpg', '/upload/img/identity/identity_201905102344565cd59c78a3da6.jpg', '/upload/img/identity/identity_201905102344565cd59c78a9b36.jpg', '411524199605245100', '1', '2019-05-10 23:44:56');
INSERT INTO `personal_at_merchant` VALUES ('5', '24', '柏林大酒店', '河南省驻马店市驿城区置地大道450', '/upload/img/industry/industry_201905110000445cd5a02cb0e31.jpg', '/upload/img/identity/identity_201905110000445cd5a02caf654.jpg', '/upload/img/identity/identity_201905110000445cd5a02cb0332.jpg', '233524199605245131', '1', '2019-05-11 00:00:44');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='个人信息表：学生认证信息表personal_At_student';

-- ----------------------------
-- Records of personal_at_student
-- ----------------------------
INSERT INTO `personal_at_student` VALUES ('6', '28', '黄淮学院', '软件工程', '本科', '2015-09-01', '2019-06-01', '/upload/img/studentCard/studentCard_201905110035155cd5a843af82a.jpg', '/upload/img/identity/identity_201905110035155cd5a843aded4.jpg', '/upload/img/identity/identity_201905110035155cd5a843aec35.jpg', '411524199605245137', '1', '2019-05-11 00:35:15');
INSERT INTO `personal_at_student` VALUES ('8', '31', '黄淮学院', '软件工程', '本科', '2015-09-01', '2019-06-01', '/upload/img/studentCard/studentCard_201905110035155cd5a843af82a.jpg', '/upload/img/identity/identity_201905110035155cd5a843aded4.jpg', '/upload/img/identity/identity_201905110035155cd5a843aec35.jpg', '411524199605245136', '1', '2019-05-11 00:35:15');
INSERT INTO `personal_at_student` VALUES ('9', '30', '黄淮学院', '软件工程', '本科', '2015-09-01', '2019-06-01', '/upload/img/studentCard/studentCard_201905110035155cd5a843af82a.jpg', '/upload/img/identity/identity_201905110035155cd5a843aded4.jpg', '/upload/img/identity/identity_201905110035155cd5a843aec35.jpg', '411524199605245134', '1', '2019-05-11 00:35:15');
INSERT INTO `personal_at_student` VALUES ('10', '32', '黄淮学院', '软件工程', '本科', '2019-05-08', '2019-05-24', '/upload/img/studentCard/studentCard_201905110051425cd5ac1ee4839.jpg', '/upload/img/identity/identity_201905110051425cd5ac1ee2e17.jpg', '/upload/img/identity/identity_201905110051425cd5ac1ee3a91.jpg', '111111111111111111', '1', '2019-05-11 00:51:42');
INSERT INTO `personal_at_student` VALUES ('11', '25', '驻马店技术学院', '汽修专业', '专科', '2019-05-10', '2019-05-24', '/upload/img/studentCard/studentCard_201905110108445cd5b01c7c5bd.jpg', '/upload/img/identity/identity_201905110108445cd5b01c7ad67.jpg', '/upload/img/identity/identity_201905110108445cd5b01c7b9f4.jpg', '222222222222222222', '0', '2019-05-11 01:08:44');
INSERT INTO `personal_at_student` VALUES ('12', '26', '测试学院', '测试', '本科', '2019-05-11', '2019-05-24', '/upload/img/studentCard/studentCard_201905110110145cd5b07694496.jpg', '/upload/img/identity/identity_201905110110145cd5b0769284a.jpg', '/upload/img/identity/identity_201905110110145cd5b07693631.jpg', '333333333333333333', '-1', '2019-05-11 01:10:14');

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
  CONSTRAINT `fk_collection_information_infor` FOREIGN KEY (`information_id`) REFERENCES `personal_information` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_collection_information_shou` FOREIGN KEY (`shou_id`) REFERENCES `task_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='收藏职位表personal_collection';

-- ----------------------------
-- Records of personal_collection
-- ----------------------------
INSERT INTO `personal_collection` VALUES ('10', '28', '26');
INSERT INTO `personal_collection` VALUES ('14', '28', '32');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='个人信息表：工作经验personal_experience';

-- ----------------------------
-- Records of personal_experience
-- ----------------------------
INSERT INTO `personal_experience` VALUES ('2', '28', '郑州众合景轩', '2018-11-01', '2019-05-01', '实习，负责网站开发，公司项目研发');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='个人信息表：说明表personal_explain';

-- ----------------------------
-- Records of personal_explain
-- ----------------------------
INSERT INTO `personal_explain` VALUES ('7', '23', '黄焖鸡米饭又叫香鸡煲或浓汁鸡煲饭，是鲁菜名吃，源自山东济南天桥区的传统名吃。色香味美，口感鲜嫩，透味不粘腻，香味浓郁。', '黄焖鸡米饭又叫香鸡煲或浓汁鸡煲饭，是鲁菜名吃，源自山东济南天桥区的传统名吃。色香味美，口感鲜嫩，透味不粘腻，香味浓郁。', '河南省驻马店市驿城区健康路北');
INSERT INTO `personal_explain` VALUES ('8', '24', '酒店于2009年9月26日正式营业，按星级标准欧式风格装修，双静音设计，全环保材料，所有房间均配有智能空调，32寸数字液晶电视，10M宽带，1.8米舒适大床(单间)。并特推出19寸液晶电脑房。', '酒店于2009年9月26日正式营业，按星级标准欧式风格装修，双静音设计，全环保材料，所有房间均配有智能空调，32寸数字液晶电视，10M宽带，1.8米舒适大床(单间)。并特推出19寸液晶电脑房', '河南省驻马店市驿城区置地大道450');
INSERT INTO `personal_explain` VALUES ('9', '28', '性格开朗，热爱生活，热爱学习', '', '');
INSERT INTO `personal_explain` VALUES ('10', '30', '测试账户', '', '');
INSERT INTO `personal_explain` VALUES ('11', '31', '测试账户', '', '');
INSERT INTO `personal_explain` VALUES ('12', '32', '测试账户', '', '');
INSERT INTO `personal_explain` VALUES ('13', '33', '测试', '', '');
INSERT INTO `personal_explain` VALUES ('14', '40', '精通各种前端技术', '', '');

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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COMMENT='个人信息表：主表personal_information';

-- ----------------------------
-- Records of personal_information
-- ----------------------------
INSERT INTO `personal_information` VALUES ('23', '22', '黄焖鸡米饭', '10', '男', '18839651400', '18839651400@qq.com', '1', '2019-05-10 23:35:10', '/upload/img/headPortrait/headPortrait_201905102347215cd59d09c322d.png', '99', '0');
INSERT INTO `personal_information` VALUES ('24', '23', '柏林大酒店', '10', '男', '18839651401', '18839651401@qq.com', '1', '2019-05-10 23:55:14', '/upload/img/headPortrait/headPortrait_201905102358285cd59fa4aa466.png', '100', '0');
INSERT INTO `personal_information` VALUES ('25', '24', '18839651402', '1', '男', null, null, '0', '2019-05-11 00:17:36', '/upload/img/headPortrait/tou.jpg', '100', '0');
INSERT INTO `personal_information` VALUES ('26', '25', '18839651403', '1', '男', null, null, '0', '2019-05-11 00:17:48', '/upload/img/headPortrait/tou.jpg', '100', '1');
INSERT INTO `personal_information` VALUES ('27', '26', '18839651404', '1', '男', null, null, '0', '2019-05-11 00:17:59', '/upload/img/headPortrait/tou.jpg', '100', '2');
INSERT INTO `personal_information` VALUES ('28', '28', '易建伟', '10', '女', '18839651473', '1104647079@qq.com', '2', '2019-05-11 00:19:31', '/upload/img/headPortrait/headPortrait_201906012218355cf2893b9b318.jpg', '99', '0');
INSERT INTO `personal_information` VALUES ('30', '30', '18839651405', '11', '女', '18839651405', '18839651405@qq.com', '2', '2019-05-11 00:40:55', '/upload/img/headPortrait/headPortrait_201905110046195cd5aadb9a480.png', '100', '0');
INSERT INTO `personal_information` VALUES ('31', '31', '18839651409', '22', '女', '18839651409', '18839651409@qq.com', '2', '2019-05-11 00:41:23', '/upload/img/headPortrait/headPortrait_201905110048105cd5ab4acb056.png', '100', '0');
INSERT INTO `personal_information` VALUES ('32', '32', '张三', '22', '男', '18839651410', '18839651410@qq.com', '2', '2019-05-11 00:48:52', '/upload/img/headPortrait/headPortrait_201905110050545cd5abeea4d7c.png', '100', '0');
INSERT INTO `personal_information` VALUES ('33', '33', '李四', '11', '男', '18839651471', '18839651471@qq.com', '0', '2019-05-11 08:35:04', '/upload/img/headPortrait/headPortrait_201905110835595cd618ef42db9.png', '100', '0');
INSERT INTO `personal_information` VALUES ('34', '34', '18839651474', '1', '男', null, null, '0', '2019-05-11 09:04:35', '/upload/img/headPortrait/tou.jpg', '100', '0');
INSERT INTO `personal_information` VALUES ('40', '40', '遗忘', '22', '男', '18839651477', '110@qq.com', '0', '2019-05-30 17:23:41', '/upload/img/headPortrait/headPortrait_201906012217365cf28900a5f81.jpg', '100', '0');
INSERT INTO `personal_information` VALUES ('41', '41', '晴天', '1', '女', null, null, '0', '2019-05-30 22:12:17', 'https://wx.qlogo.cn/mmopen/vi_32/zCrpM5pRmwEyXwjZVb9reK5FBAE8nLdKxlmOM7AMdHPZrZGvjX1Mo4HU15L4bSWL1o28n1pMnfMh8arTvib1VsQ/132', '100', '0');
INSERT INTO `personal_information` VALUES ('42', '42', '1111', '1', '男', null, null, '0', '2019-06-02 15:55:14', '/upload/img/headPortrait/tou.jpg', '100', '0');

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
  CONSTRAINT `log_information_id` FOREIGN KEY (`information_id`) REFERENCES `personal_information` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `log_taskList_id` FOREIGN KEY (`task_id`) REFERENCES `task_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='个人信息表：操作日志表personal_log';

-- ----------------------------
-- Records of personal_log
-- ----------------------------
INSERT INTO `personal_log` VALUES ('11', '23', null, '恭喜您，您的认证信息已通过！', '2019-05-10 23:45:51');
INSERT INTO `personal_log` VALUES ('12', '24', null, '恭喜您，您的认证信息已通过！', '2019-05-11 00:01:20');
INSERT INTO `personal_log` VALUES ('13', '26', null, '您的账号已警告，原因：测试警告', '2019-05-11 00:18:44');
INSERT INTO `personal_log` VALUES ('14', '27', null, '您的账号已禁封，原因：测试封号 =', '2019-05-11 00:19:04');
INSERT INTO `personal_log` VALUES ('15', '28', null, '恭喜您，您的认证信息已通过！', '2019-05-11 00:35:34');
INSERT INTO `personal_log` VALUES ('16', '32', null, '恭喜您，您的认证信息已通过！', '2019-05-11 00:52:10');
INSERT INTO `personal_log` VALUES ('17', '25', null, '您的信息认证未通过，原因：身份证不合规', '2019-05-11 01:09:04');
INSERT INTO `personal_log` VALUES ('18', '40', null, '您的账号已禁封，原因：测试封禁', '2019-05-30 22:13:31');
INSERT INTO `personal_log` VALUES ('19', '40', null, '您的账号已禁封，原因：啊啊啊', '2019-05-30 22:47:26');

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
-- Records of personal_untask
-- ----------------------------

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='任务表：任务申请表task_apply';

-- ----------------------------
-- Records of task_apply
-- ----------------------------
INSERT INTO `task_apply` VALUES ('1', '28', '30', '1');
INSERT INTO `task_apply` VALUES ('2', '28', '31', '1');
INSERT INTO `task_apply` VALUES ('3', '28', '32', '1');
INSERT INTO `task_apply` VALUES ('24', '28', '28', '1');
INSERT INTO `task_apply` VALUES ('25', '27', '28', '-1');
INSERT INTO `task_apply` VALUES ('26', '24', '28', '-1');
INSERT INTO `task_apply` VALUES ('27', '32', '28', '-1');
INSERT INTO `task_apply` VALUES ('28', '26', '28', '-1');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='任务表：任务评价表task_evaluate';

-- ----------------------------
-- Records of task_evaluate
-- ----------------------------
INSERT INTO `task_evaluate` VALUES ('8', '28', '23', '用户***974', '99', '很好，很不错', '2019-05-11 00:53:50');
INSERT INTO `task_evaluate` VALUES ('9', '28', '28', '用户***801', '99', '很好的店家', '2019-05-11 01:02:28');

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='任务表：任务表task_list';

-- ----------------------------
-- Records of task_list
-- ----------------------------
INSERT INTO `task_list` VALUES ('18', '23', '1', '驻马店', '驿城区', '高薪诚聘送餐员', '1', '150', '月结', '2019-05-11 23:49:00', '2019-05-30 23:49:00', '薪资待遇:每单（7-10）+各项补贴（等级奖每跑一单奖0.5元+天气补贴1元每单+大额订单10元每单，每个月平均单量在800-1500之间。\n年龄18-45周，可以提供住宿不管吃，去饿了么指定商家吃饭3-6折，提供租赁车辆。年底3薪，干满一年报销往返车票，工龄奖每月补贴200-300元，加班补贴每单2元。\n提供个人保险，第三责任险，月综合工资在8000-15000左右，多劳多得。', '性别不限   18-45岁', '河南省驻马店市驿城区健康路北', '0', '0', '2019-05-10 23:50:17');
INSERT INTO `task_list` VALUES ('19', '23', '5', '驻马店', '驿城区', '饭店服务员', '10', '120', '日结', '2019-07-10 23:51:00', '2019-12-10 23:51:00', '工作内容；按照领导的安排认真做好工作，服从领班，经理的指挥，团结友善，善于帮助同事工作。\n基本工资，任务奖金，提成。', '只招女生17-40岁初中及以上', '河南省驻马店市驿城区健康路北', '0', '0', '2019-05-10 23:52:18');
INSERT INTO `task_list` VALUES ('20', '23', '1', '驻马店', '驿城区', '招聘厨师后厨', '1', '200', '日结', '2019-05-11 23:52:00', '2019-05-31 23:52:00', '1、 执行餐饮经理下达的各项工作任务和工作指示\n2、 擅长中餐菜系的烹饪，有全面厨房管理经验，有厨师证书。\n3、 负责厨房的调配和协调工作，了解员工情况，根据每个员工的特长安排工作，随时根据工作的繁简，任务轻重对厨房人员合理搭配\n4、 负责制定原料采购计划，准确掌握原料库存量，合理安排原料的使用，监督各道生产工序，避免浪费，及时进行货物清理，严格控制成本', '性别不限 ，20-30岁，高中及以上', '河南省驻马店市驿城区健康路北', '0', '0', '2019-05-10 23:53:57');
INSERT INTO `task_list` VALUES ('21', '24', '5', '驻马店', '驿城区', '包吃住，4千-4500底薪 ，急聘服务员', '10', '2500', '月结', '2019-05-16 00:05:00', '2019-05-20 00:05:00', '1、按照领班安排认真做好桌椅、餐厅卫生，餐厅铺台，准备好各种用品，确保正常营业使用。\n2、接待顾客应主动、热情、礼貌、耐心、周到，使顾客有宾至如归之感； \n3、运用礼貌语言，为客人提供服务', '服务人员：基本工资3200元-3500元\n主管级人员：基本工资4500元-5000元\n经理级人员：基本工资7000元-8000元\n', '河南省驻马店市驿城区置地大道450', '0', '0', '2019-05-11 00:05:59');
INSERT INTO `task_list` VALUES ('22', '24', '5', '驻马店', '驿城区', '服务员', '10', '3000', '月结', '2019-05-16 00:05:00', '2019-05-20 00:05:00', '1、按照领班安排认真做好桌椅、餐厅卫生，餐厅铺台，准备好各种用品，确保正常营业使用。\n2、接待顾客应主动、热情、礼貌、耐心、周到，使顾客有宾至如归之感； \n3、运用礼貌语言，为客人提供服务', '服务人员：基本工资3200元-3500元\n主管级人员：基本工资4500元-5000元\n经理级人员：基本工资7000元-8000元\n', '河南省驻马店市驿城区置地大道450', '0', '0', '2019-05-11 00:05:59');
INSERT INTO `task_list` VALUES ('23', '24', '5', '驻马店', '驿城区', '招聘服务员', '10', '200', '月结', '2019-05-16 00:05:00', '2019-05-20 00:05:00', '1、按照领班安排认真做好桌椅、餐厅卫生，餐厅铺台，准备好各种用品，确保正常营业使用。\n2、接待顾客应主动、热情、礼貌、耐心、周到，使顾客有宾至如归之感； \n3、运用礼貌语言，为客人提供服务', '服务人员：基本工资3200元-3500元\n主管级人员：基本工资4500元-5000元\n经理级人员：基本工资7000元-8000元\n', '河南省驻马店市驿城区置地大道450', '0', '0', '2019-05-11 00:05:59');
INSERT INTO `task_list` VALUES ('24', '24', '6', '驻马店', '驿城区', '保安', '5', '200', '日结', '2019-05-16 00:05:00', '2019-05-20 00:05:00', '1、按照领班安排认真做好桌椅、餐厅卫生，餐厅铺台，准备好各种用品，确保正常营业使用。\n2、接待顾客应主动、热情、礼貌、耐心、周到，使顾客有宾至如归之感； \n3、运用礼貌语言，为客人提供服务', '服务人员：基本工资3200元-3500元\n主管级人员：基本工资4500元-5000元\n经理级人员：基本工资7000元-8000元\n', '河南省驻马店市驿城区置地大道450', '0', '0', '2019-05-11 00:05:59');
INSERT INTO `task_list` VALUES ('25', '24', '1', '郑州', '中原区', '测试任务', '1', '111', '日结', '2019-08-12 00:10:00', '2019-12-11 00:10:00', '测试任务', '测试任务', '测试地址', '0', '0', '2019-05-11 00:11:29');
INSERT INTO `task_list` VALUES ('26', '24', '2', '驻马店', '驿城区', '发传单', '20', '80', '日结', '2019-05-12 00:12:00', '2019-05-13 00:12:00', '发传单', '发传单', '驻马店开源大道', '0', '0', '2019-05-11 00:12:59');
INSERT INTO `task_list` VALUES ('27', '24', '1', '郑州', '二七区', '区域客服专员', '1', '150', '日结', '2019-05-12 00:13:00', '2019-05-22 00:13:00', '1、通过电话对公司老客户进行维护和开发工作；\n2、根据客户的需求意向做出相关的提案；\n3、积极进取完成团队分配的业绩目标；\n4、维护良好的客户关系，掌握客户需求及时解决客户提出的问题；', '1、24岁以上,口齿清晰,普通话标准;\n2、亲和热情主动有梦想想挑战高薪;\n3、具备较强的学习能力和沟通能力;', '郑州二七区二七广场', '0', '0', '2019-05-11 00:14:22');
INSERT INTO `task_list` VALUES ('28', '23', '1', '驻马店', '新蔡县', '售后客服专员', '2', '100', '日结', '2019-05-12 00:15:00', '2019-05-15 00:15:00', '1、通过电话对公司老客户进行维护和开发工作；\n2、根据客户的需求意向做出相关的提案；\n3、积极进取完成团队分配的业绩目标；\n4、维护良好的客户关系，掌握客户需求及时解决客户提出的问题；', '1、24岁以上,口齿清晰,普通话标准;\n2、亲和热情主动有梦想想挑战高薪;\n3、具备较强的学习能力和沟通能力;', '新蔡县', '1', '0', '2019-05-11 00:16:16');
INSERT INTO `task_list` VALUES ('29', '24', '5', '郑州', '中原区', '服务员测试', '10', '120', '日结', '2019-05-12 09:06:00', '2019-05-13 09:06:00', '测试描述', '测试要求', '测试地址', '0', '0', '2019-05-11 09:06:39');
INSERT INTO `task_list` VALUES ('32', '28', '1', '郑州市', '中原区', '测试小程序', '1', '100', '日结', '2019-06-01 17:43:00', '2019-06-30 17:43:00', '测试描述', '测试要求', '测试地址', '0', '0', '2019-05-31 17:45:10');

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='分数计算表task_score';

-- ----------------------------
-- Records of task_score
-- ----------------------------
INSERT INTO `task_score` VALUES ('13', '23', '198', '2');
INSERT INTO `task_score` VALUES ('14', '24', '0', '0');
INSERT INTO `task_score` VALUES ('15', '25', '0', '0');
INSERT INTO `task_score` VALUES ('16', '26', '0', '0');
INSERT INTO `task_score` VALUES ('17', '27', '0', '0');
INSERT INTO `task_score` VALUES ('18', '28', '99', '1');
INSERT INTO `task_score` VALUES ('20', '30', '0', '0');
INSERT INTO `task_score` VALUES ('21', '31', '0', '0');
INSERT INTO `task_score` VALUES ('22', '32', '0', '0');
INSERT INTO `task_score` VALUES ('23', '33', '0', '0');
INSERT INTO `task_score` VALUES ('24', '34', '0', '0');
INSERT INTO `task_score` VALUES ('30', '40', '0', '0');
INSERT INTO `task_score` VALUES ('31', '41', '0', '0');
INSERT INTO `task_score` VALUES ('32', '42', '0', '0');

-- ----------------------------
-- Table structure for task_type
-- ----------------------------
DROP TABLE IF EXISTS `task_type`;
CREATE TABLE `task_type` (
  `typeId` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) NOT NULL,
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='任务表：任务评价表task_type';

-- ----------------------------
-- Records of task_type
-- ----------------------------
INSERT INTO `task_type` VALUES ('1', '其他');
INSERT INTO `task_type` VALUES ('2', '派发传单');
INSERT INTO `task_type` VALUES ('3', '促销导购');
INSERT INTO `task_type` VALUES ('4', '家教助教');
INSERT INTO `task_type` VALUES ('5', '服务员');
INSERT INTO `task_type` VALUES ('6', '安保');
INSERT INTO `task_type` VALUES ('7', '校园代理');
INSERT INTO `task_type` VALUES ('8', '美工设计');
INSERT INTO `task_type` VALUES ('9', '婚礼帮助');
INSERT INTO `task_type` VALUES ('10', '地推拉访');
INSERT INTO `task_type` VALUES ('11', '群众演员');
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
