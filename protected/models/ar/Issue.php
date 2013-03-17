<?php
class Issue extends CActiveRecord {
	public $name;
	public $description;
	public $product;
	public $estimate;
	public $priority;
	public $value;
	public $status;
	public $sprint;
	public $type;
	public $dropped = false;
	
	public $team;
	
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	
	public function tableName()
	{
		return 'issue_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array(
			'product' => array(self::BELONGS_TO, 'Product', 'product_id'),
			'team' => array(self::MANY_MANY, 'UserRecord', 'user_issues_table(issue_id,user_id)')
		);
	}
}