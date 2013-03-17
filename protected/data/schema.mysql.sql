CREATE TABLE `user_table` (
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
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1$$


CREATE TABLE `user_projects_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1$$

CREATE TABLE `user_issues_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `issue_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`issue_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1$$

CREATE TABLE `product_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `company_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1$$

CREATE TABLE `issue_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `estimate` int(10) unsigned DEFAULT NULL,
  `priority` int(10) unsigned DEFAULT NULL,
  `value` int(10) unsigned DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `sprint_id` int(10) unsigned DEFAULT NULL,
  `type` int(10) unsigned NOT NULL,
  `dropped` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1$$

CREATE TABLE `company_table` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1$$

