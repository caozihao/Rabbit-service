/*
SQLyog Ultimate v12.3.1 (64 bit)
MySQL - 5.7.18 : Database - jerboa
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`jerboa` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `jerboa`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `accesstoken` varchar(64) DEFAULT NULL,
  `lastLoginTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `admin` */

insert  into `admin`(`id`,`username`,`password`,`accesstoken`,`lastLoginTime`,`createdTime`,`updatedTime`) values 
(1,'root','ae98a180a16f1a7d5e8dbfe8659a4453','a6537215d3efca9c069a9fb865541408','2017-05-31 10:16:42','2017-05-31 10:16:42','2017-05-31 10:16:42'),
(6,'Skull','123456','','2017-05-26 14:14:34','2017-05-26 14:14:34','2017-05-26 14:14:34'),
(7,'CaoZH','123456','','2017-05-26 14:16:47','2017-05-26 14:16:47','2017-05-26 14:16:47');

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `author` varchar(64) NOT NULL,
  `readNum` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `article` */

insert  into `article`(`id`,`title`,`author`,`readNum`,`content`,`createdTime`,`updatedTime`) values 
(2,'带你了解综合评分不足的原因','mo9运营',NULL,'<p style=\'margin: 1em 0;\' >在金融借贷中，偶尔会遇到被金融机构无情拒绝的情况，而拒绝理由，往往是一句含糊的“综合评分不足”。</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >“综合评分不足”究竟是什么鬼？遭遇“综合评分不足”该如何应对？今天我们为大家带来一篇干货讲解，关于金融借款中常见的拒绝理由——综合评分不足。</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >综合评分金融机构对借款人或是信用卡申请者给出的个人信审评分，如果申请人总体得分达不到系统的要求分数，就会被自动拒贷。</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >无论是银行还是互联网借款平台，信审评分都会包括很多方面。如果有一家金融机构说你综合评分不足，往往就是以下几块出了问题：</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >一、资料不足或是资料造假</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >网络借贷要求的资料相对较少，比如身份证号码、手机号、绑定在个人名下的银行卡号，常用联系人，单位信息等等，如果资料提交不充分或有虚假信息，综合评分就会大打折扣，直接被拒。</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >二、借贷逾期多</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >即便网络借款平台不上央行征信，行业之间也有大数据共享。如果在平台上逾期太多，大数据里就会判定此类用户信用不良，拉低综合评分。</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >三、个人负债高</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >个人负债高非常容易拉低个人综合信用评分，以下几种情况都可能造成个人负债高的情况：给别人担保贷款，对方没还清；信用卡每个月欠款额过高；申请了多笔贷款，都在还贷期等等。</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >四、工资收入过低</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >银行办信用卡要求用户有稳定收入，互联网借贷平台也偏爱这类有稳定收入的人群。普通贷款产品在收入要求上有门槛限制，各平台要求不同，门槛金额也不一样。</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >五、同一时段申请多个贷款</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >如果被银行或是借款平台查到同时段某用户申请了多笔贷款或是多张信用卡，那么金融机构觉得该用户有套现风险，自然也会给出相对较低的综合评分。</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>\n<p style=\'margin: 1em 0;\' >以上，就是造成个人综合评分不足的五大常见原因。总而言之，信用如金，点滴珍贵。珍惜自己的信用，规范自己在信用生活中的行为，个人信用评分才会越来越高。</p>\n<p style=\'margin: 1em 0;\' ><div style=\'display: inline-block;width: 5px;height: 12px;\'></div></p>','2017-05-25 18:32:38','2017-05-25 18:32:38'),
(3,'关于飞鼠贷使用中的一些问题解答','mo9运营',NULL,'<p style=\'margin: 1em 0;\' >根据各位用户在实际应用中的反馈，飞鼠贷收集了一些最新的问题罗列出来，并附上官方权威解答，希望能为大家答疑解惑。</p>\n<p style=\'margin: 1em 0;\' ><br></p>\n<p style=\'margin: 1em 0;\' >一、审核通过后多久下款？</p>\n<p style=\'margin: 1em 0;\' >审核通过后当天放款哦，请随时留意银行卡收款信息。</p>\n<p style=\'margin: 1em 0;\' ><br></p>\n<p style=\'margin: 1em 0;\' >二、还款失败怎么办？</p>\n<p style=\'margin: 1em 0;\' >联系人工客服，（APP点击右上角耳机图标进入智能客服或选择转人工客服），描述你遇到的问题，告知客服你的具体操作流程并出示故障页面截图。</p>\n<p style=\'margin: 1em 0;\' ><br></p>\n<p style=\'margin: 1em 0;\' >三、什么时候可以续期？</p>\n<p style=\'margin: 1em 0;\' >现在续期功能已经取消，请大家按时还款。</p>\n<p style=\'margin: 1em 0;\' ><br></p>\n<p style=\'margin: 1em 0;\' >四、怎么尽快提额？</p>\n<p style=\'margin: 1em 0;\' >按时还款，不要逾期。每次都按时还款，基本5次就可以提额。</p>\n<p style=\'margin: 1em 0;\' ><br></p>\n<p style=\'margin: 1em 0;\' >五、被拒后还能再借吗？</p>\n<p style=\'margin: 1em 0;\' >可以，审核未通过的用户可以进入申请借款页面查看倒计时，一段时间后可以再次申请借款。</p>\n<p style=\'margin: 1em 0;\' ><br></p>\n<p style=\'margin: 1em 0;\' >六、老客户逾期还能免审吗？</p>\n<p style=\'margin: 1em 0;\' >这个视逾期情况而定，一般来说老客户逾期较久的话，还款后需要重新过一遍审核。所以希望大家珍惜自己的信用。</p>\n<p style=\'margin: 1em 0;\' ><br></p>\n<p style=\'margin: 1em 0;\' >七、现在最高额度是多少？</p>\n<p style=\'margin: 1em 0;\' >目前最高的额度是1500，后期将视情况开放更高额度。</p>\n<p style=\'margin: 1em 0;\' ><br></p>\n<p style=\'margin: 1em 0;\' >如果大家有什么新的问题和意见，请及时反馈给客服九妹，我们将不断努力，一直前行。</p>','2017-05-25 18:33:17','2017-05-25 18:33:17');

/*Table structure for table `author` */

DROP TABLE IF EXISTS `author`;

CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `createdTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `author` */

insert  into `author`(`id`,`name`,`createdTime`,`updatedTime`) values 
(1,'mo9运营','2017-05-25 18:14:39','2017-05-25 18:14:54');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
