<?php
//связь "пользователь"-"назначенная задача"
class IssueAssign extends CActiveRecord {
	public $user;
	public $issue;
	
	public static function model($className=__CLASS__){
		return parent::model($className);
	}
	
	public function tableName(){
		return 'user_issues_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array(
			'user' => array(self::HAS_ONE, 'UserRecord', 'user_id'),
			'issue' => array(self::HAS_ONE, 'Issue', 'issue_id')
		);
	}
}