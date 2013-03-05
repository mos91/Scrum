<?php
class UserRecord extends CActiveRecord {
	public $firstname;
	public $lastname;
	public $email;
	public $password;
	public $session_key;
	//user settings;
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
}