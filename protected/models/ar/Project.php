<?php
class Project extends CActiveRecord {
	public $name;
	public $description;
	public $company;
	
	public static function model($className=__CLASS__){
		return parent::model($className);
	}
	
	public function tableName(){
		return 'project_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array(
			'company' => array(self::BELONGS_TO, 'Company', 'company_id'),
			'users' => array(self::MANY_MANY, 'UserRecord', 'user_projects_table(project_id,user_id)')
		);
	}
	
	public function scopes(){
		return array(
			'byUser'
		);
	}
	
	public function byUser($userId){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'dropped=0',
			'with' => array('users' => 
					array('select' => false, 
						  'condition'=>'users.id=:id', 
						  'params' => array(':id' => $userId)
						)
			) 		 
		));
		return $this;
	}
}