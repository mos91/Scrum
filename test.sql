-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2014 at 12:08 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `test`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `test_multi_sets`()
    DETERMINISTIC
begin
        select user() as first_col;
        select user() as first_col, now() as second_col;
        select user() as first_col, now() as second_col, now() as third_col;
        end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `company_table`
--

CREATE TABLE IF NOT EXISTS `company_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET latin1 NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `company_table`
--

INSERT INTO `company_table` (`id`, `name`, `description`) VALUES
(1, 'test', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `project_comments_table`
--

CREATE TABLE IF NOT EXISTS `project_comments_table` (
  `id` int(11) NOT NULL,
  `content` text,
  `author_id` int(10) unsigned NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `post_date` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project_comments_table`
--

INSERT INTO `project_comments_table` (`id`, `content`, `author_id`, `project_id`, `post_date`) VALUES
(0, 'comment #1', 1, 1, 1368958176);

-- --------------------------------------------------------

--
-- Table structure for table `project_table`
--

CREATE TABLE IF NOT EXISTS `project_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `company_id` int(10) unsigned DEFAULT NULL,
  `dropped` tinyint(4) NOT NULL,
  `active_sprint_id` int(10) unsigned DEFAULT NULL,
  `update_time` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `project_table`
--

INSERT INTO `project_table` (`id`, `name`, `description`, `company_id`, `dropped`, `active_sprint_id`, `update_time`) VALUES
(1, 'Scrum', '<b style="font-family: sans-serif; line-height: 19.1875px;">Scrum</b><span style="font-family: sans-serif; line-height: 19.1875px;">&nbsp;— методология управления проектами, активно применяющаяся при разработке информационных систем для&nbsp;</span><a href="http://ru.wikipedia.org/wiki/%D0%93%D0%B8%D0%B1%D0%BA%D0%B0%D1%8F_%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%8F_%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8" title="Гибкая методология разработки" style="text-decoration: none; color: rgb(11, 0, 128); background-image: none; font-family: sans-serif; line-height: 19.1875px;">гибкой разработки программного обеспечения</a><span style="font-family: sans-serif; line-height: 19.1875px;">. Scrum чётко делает акцент на качественном контроле процесса разработки. Кроме управления проектами по разработке ПО Scrum может также использоваться в работе команд поддержки программного обеспечения (</span><i style="font-family: sans-serif; line-height: 19.1875px;">software support teams</i><span style="font-family: sans-serif; line-height: 19.1875px;">), или как подход управления разработкой и сопровождением программ:&nbsp;</span><i style="font-family: sans-serif; line-height: 19.1875px;">Scrum of Scrums</i><span style="font-family: sans-serif; line-height: 19.1875px;">.</span><div><span style="font-family: sans-serif; line-height: 19.1875px;"><br></span></div><div><span style="font-family: sans-serif; line-height: 19.1875px;"><br></span></div><div><span style="font-family: sans-serif; line-height: 19.1875px;">-----</span></div><div><span style="font-family: sans-serif; line-height: 19.1875px;">------</span></div><div><span style="font-family: sans-serif; line-height: 19.1875px;">---------------</span></div>', 1, 0, NULL, 1369743255),
(4, 'Agile', '', 1, 0, NULL, 0),
(5, 'XP', '', 1, 0, NULL, 0),
(6, 'Lean', '', 1, 0, NULL, 0),
(7, 'V-Model', '<b style="font-family: sans-serif; line-height: 19.1875px;">V-Model</b><span style="font-family: sans-serif; line-height: 19.1875px;">&nbsp;(или VEE модель) является моделью разработки&nbsp;</span><a href="http://ru.wikipedia.org/wiki/%D0%98%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%B0%D1%8F_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0" title="Информационная система" style="text-decoration: none; color: rgb(11, 0, 128); background-image: none; font-family: sans-serif; line-height: 19.1875px;">информационных систем</a><span style="font-family: sans-serif; line-height: 19.1875px;">&nbsp;(ИС), направленной на упрощение понимания сложностей, связанных с разработкой систем. Она используется для определения единой процедуры разработки&nbsp;</span><a href="http://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D1%8B%D0%B9_%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82" title="Программный продукт" class="mw-redirect" style="text-decoration: none; color: rgb(11, 0, 128); background-image: none; font-family: sans-serif; line-height: 19.1875px;">программных продуктов</a><span style="font-family: sans-serif; line-height: 19.1875px;">,&nbsp;</span><a href="http://ru.wikipedia.org/wiki/%D0%90%D0%BF%D0%BF%D0%B0%D1%80%D0%B0%D1%82%D0%BD%D0%BE%D0%B5_%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D0%B5" title="Аппаратное обеспечение" style="text-decoration: none; color: rgb(11, 0, 128); background-image: none; font-family: sans-serif; line-height: 19.1875px;">аппаратного обеспечения</a><span style="font-family: sans-serif; line-height: 19.1875px;">&nbsp;и&nbsp;</span><a href="http://ru.wikipedia.org/wiki/%D0%A7%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA%D0%BE-%D0%BC%D0%B0%D1%88%D0%B8%D0%BD%D0%BD%D1%8B%D0%B9_%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D1%84%D0%B5%D0%B9%D1%81" title="Человеко-машинный интерфейс" style="text-decoration: none; color: rgb(11, 0, 128); background-image: none; font-family: sans-serif; line-height: 19.1875px;">человеко-машинных интерфейсов</a><span style="font-family: sans-serif; line-height: 19.1875px;">.</span>', 1, 0, NULL, 1368957812);

-- --------------------------------------------------------

--
-- Table structure for table `sprint_comments_table`
--

CREATE TABLE IF NOT EXISTS `sprint_comments_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` text,
  `author_id` int(10) unsigned NOT NULL,
  `sprint_id` int(10) unsigned NOT NULL,
  `post_date` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `sprint_comments_table`
--

INSERT INTO `sprint_comments_table` (`id`, `content`, `author_id`, `sprint_id`, `post_date`) VALUES
(1, 'new comment #2\n', 1, 18, 1369492107);

-- --------------------------------------------------------

--
-- Table structure for table `sprint_table`
--

CREATE TABLE IF NOT EXISTS `sprint_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_bin,
  `project_id` int(11) DEFAULT NULL,
  `estimate` int(10) unsigned NOT NULL,
  `status` int(11) DEFAULT NULL,
  `dropped` tinyint(4) NOT NULL,
  `update_time` bigint(20) unsigned NOT NULL,
  `start_time` bigint(20) unsigned DEFAULT NULL,
  `end_time` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `sprint_table`
--

INSERT INTO `sprint_table` (`id`, `name`, `description`, `project_id`, `estimate`, `status`, `dropped`, `update_time`, `start_time`, `end_time`) VALUES
(17, 'sprint 1', '', 1, 261, 2, 1, 1369237812, 1361210000, 1369237812),
(18, 'sprint 2', '', 1, 75, 2, 1, 1369490653, 1369237911, 1369490653),
(20, 'sprint 3', 0x74686973206973206e657720737072696e74, 1, 170, 2, 1, 1369600951, 1369600914, 1369600951),
(21, 'sprint 4', '', 1, 146, 2, 1, 1369743674, 1369743603, 1369743674),
(22, 'sprint 5', '', 1, 140, 2, 0, 1369745283, 1369744825, 1369745283);

-- --------------------------------------------------------

--
-- Table structure for table `userstory_comments_table`
--

CREATE TABLE IF NOT EXISTS `userstory_comments_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` text,
  `author_id` int(10) unsigned NOT NULL,
  `userstory_id` int(10) unsigned NOT NULL,
  `post_date` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `userstory_comments_table`
--

INSERT INTO `userstory_comments_table` (`id`, `content`, `author_id`, `userstory_id`, `post_date`) VALUES
(1, 'new comment #1', 1, 163, 1369745219),
(2, 'new comment #2', 1, 163, 1369745225),
(3, 'new comment #3', 1, 163, 1369745232);

-- --------------------------------------------------------

--
-- Table structure for table `user_projects_table`
--

CREATE TABLE IF NOT EXISTS `user_projects_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `favorite` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `user_projects_table`
--

INSERT INTO `user_projects_table` (`id`, `user_id`, `project_id`, `favorite`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 0),
(3, 1, 3, 0),
(4, 1, 4, 0),
(5, 1, 5, 0),
(6, 1, 6, 0),
(7, 1, 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_story_table`
--

CREATE TABLE IF NOT EXISTS `user_story_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(11) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `estimate` int(10) unsigned NOT NULL,
  `priority` int(10) unsigned NOT NULL,
  `status` int(11) unsigned NOT NULL,
  `sprint_id` int(10) unsigned DEFAULT NULL,
  `dropped` tinyint(4) NOT NULL,
  `update_time` bigint(20) unsigned NOT NULL,
  `complete_time` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=166 ;

--
-- Dumping data for table `user_story_table`
--

INSERT INTO `user_story_table` (`id`, `project_id`, `name`, `description`, `estimate`, `priority`, `status`, `sprint_id`, `dropped`, `update_time`, `complete_time`) VALUES
(141, 1, 'user story 1', '', 55, 2, 12, 17, 0, 1369236696, NULL),
(142, 1, 'user story 2', '', 45, 1, 12, 17, 0, 1369236698, NULL),
(143, 1, 'user story 3', '', 56, 1, 12, 17, 0, 1369236699, NULL),
(144, 1, 'user story 4', '', 70, 1, 12, 17, 0, 1369236701, NULL),
(145, 1, 'user story 5', '', 35, 1, 12, 17, 0, 1369236703, NULL),
(146, 1, 'user story 21', '', 15, 1, 12, 18, 0, 1369237930, NULL),
(147, 1, 'user story 22', '', 25, 1, 12, 18, 0, 1369490632, NULL),
(148, 1, 'user story 23', '', 35, 2, 12, 18, 0, 1369490636, NULL),
(149, 1, 'user story 1', '', 30, 0, 12, 19, 0, 1369491939, NULL),
(150, 1, 'user story 2', '', 50, 2, 12, 19, 0, 1369491897, NULL),
(151, 1, 'user story 3', '', 40, 2, 12, 19, 0, 1369491895, NULL),
(152, 1, 'user story 4', '', 30, 2, 12, 19, 0, 1369491894, NULL),
(153, 1, 'user story 5', '', 50, 2, 12, 19, 0, 1369491892, NULL),
(154, 1, 'user story 30', '', 50, 2, 12, 20, 0, 1369600935, NULL),
(155, 1, 'user story 32', '', 60, 2, 12, 20, 0, 1369600941, NULL),
(156, 1, 'user story 33', '', 60, 2, 12, 20, 0, 1369600945, NULL),
(157, 1, 'user story 99', '', 40, 2, 12, 21, 0, 1369743664, NULL),
(158, 1, 'user story 100', '', 50, 2, 12, 21, 0, 1369743667, NULL),
(159, 1, 'user story 101', '', 56, 2, 12, 21, 0, 1369743669, NULL),
(160, 1, 'user story 102', '', 60, 1, 12, 22, 0, 1369745275, 1369745275),
(161, 1, 'user story 103', '<font face="tahoma">dfvgdgdgdfgdfjgngndjfgnkdngjdnngdkjn<span style="white-space:pre">		</span></font>', 52, 1, 12, 22, 0, 1369745276, 1369745276),
(162, 1, 'user story 103', '<font face="times new roman">vgdgfdfgdfgdfgfdjgndngjdnkngdfgd</font>', 28, 1, 12, 22, 0, 1369745278, 1369745278),
(163, 1, 'user story 104', 'fdgdfdsfdsfjnskfsjfnskfnskdnfsdfsf<span style="white-space: pre;">	</span>', 26, 1, 12, NULL, 0, 1369745167, NULL),
(164, 1, 'user story 105', '<font face="tahoma">dfgdgfdfgdfgfdgdgdfgdfgdgd</font>', 56, 2, 12, NULL, 0, 1369745183, NULL),
(165, 1, 'user story 106', '<font face="times new roman">dfgdfgdfgdgdfgdfgdfgdfgdfgdfg</font>', 39, 1, 12, NULL, 0, 1369745196, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE IF NOT EXISTS `user_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `company_id` int(11) unsigned DEFAULT NULL,
  `session_key` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `date_format` varchar(255) DEFAULT NULL,
  `time_format` varchar(255) DEFAULT NULL,
  `first_day_of_week` varchar(255) DEFAULT NULL,
  `number_format` varchar(255) DEFAULT NULL,
  `email_notification_settings` varchar(255) DEFAULT NULL,
  `session_count` int(11) unsigned DEFAULT '0',
  `active_project_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `firstname`, `lastname`, `email`, `company_id`, `session_key`, `password`, `date_format`, `time_format`, `first_day_of_week`, `number_format`, `email_notification_settings`, `session_count`, `active_project_id`) VALUES
(1, 'test', 'test', 'otvorot2008@gmail.com', 1, 'a447a6c6110d7aa37b5b7240ec43013b', '$2a$13$NIokvgh8tXlwhNa8W.rbW.IxcEDHWnn1DTDgEZcCyElRgZhd4xBfm', 'dd/mm/yy', 'hh:mm:ss', 'monday', '0.00', '', 18, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
