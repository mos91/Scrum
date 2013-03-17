<?php
class UserRecord extends CActiveRecord {
	public $firstname;
	public $lastname;
	public $email;
	public $password;
	public $company;
	//session_information
	public $session_count;
	public $session_key;
	//user settings;
	public $active_project;
	public $date_format = 'dd/mm/yy';
	public $time_format = 'hh:mm:ss';
	public $first_day_of_week = 'monday';
	public $number_format = '0.00';
	public $email_notification_settings = '';
	
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	
	public function tableName()
	{
		return 'user_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array('company' => array(self::BELONGS_TO, 'Company', 'company_id'),
					 'active_project' => array(self::BELONGS_TO, 'Product', 'active_project_id'));
	}
}