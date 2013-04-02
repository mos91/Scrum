<?php
class Company extends CActiveRecord {
	public $name;
	public $description;
	public $users;
	public $products;
	
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	
	public function tableName()
	{
		return 'company_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array(
			'users' => array(self::HAS_MANY, 'UserRecord', 'company_id'),
			'projects' => array(self::HAS_MANY, 'Project', 'company_id')
		);
	}
}