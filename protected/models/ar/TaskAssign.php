<?php
//связь "пользователь"-"назначенная задача"
class TaskAssign extends CActiveRecord {
	public $user;
	public $task;
	public $project;
	
	public static function model($className=__CLASS__){
		return parent::model($className);
	}
	
	public function tableName(){
		return 'user_tasks_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array(
			'user' => array(self::HAS_ONE, 'UserRecord', 'user_id'),
			'task' => array(self::HAS_ONE, 'Issue', 'issue_id'),
			'project' => array(self::HAS_ONE, 'Project', 'product_id')
		);
	}
}