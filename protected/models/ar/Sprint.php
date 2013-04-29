<?php
class Sprint extends CActiveRecord {
	public $name;
	public $description;
	
	public $status;
	public $dropped = false;
	
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	
	public function tableName()
	{
		return 'sprint_table';
	}
	
	public function primaryKey(){
		return 'id';
	}

	public function relations(){
		return array(
			'project' => array(self::BELONGS_TO, 'Project', 'project_id')
			//'team' => array(self::MANY_MANY, 'UserRecord', 'user_issues_table(issue_id,user_id)')
		);
	}
}