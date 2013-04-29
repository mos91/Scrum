<?php
class Project extends CActiveRecord {
	public $name;
	public $description;
	
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
			'users' => array(self::MANY_MANY, 'UserRecord', 'user_projects_table(project_id,user_id)'),
			'assigns' => array(self::HAS_MANY, 'ProjectAssign', 'project_id')
		);
	}
	
	public function scopes(){
		return array(
			'localInfo',
			'live',
			'trashed',
			'favorite'
		);
	}
	
	/*get information about project for current user specified with project id(s)*/
	public function localinfo($userId, $projectIds){
		$withCriteria = array('assigns' => 
			array(
			 'select' => 'favorite',
			 'condition' => 'user_id=:id',
			 'params' => array(':id' => $userId)
			));

		if (is_array($projectIds)) 
			$withCriteria['assigns']['condition'] .= ' AND project_id IN ('.implode(',', $projectIds).')';
		else if (is_string($projectIds)){
			$id = $projectIds;
			$withCriteria['assigns']['condition'] .= ' AND project_id=:project_id';
			$withCriteria['assigns']['params'][':project_id'] .= $projectIds;
		}
			
		$this->getDbCriteria()->mergeWith(array(
			'with' => $withCriteria
		));
		return $this;
	}
	/*get favorite projects for current user*/
	public function favorite($userId){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'dropped=0',
			'with' => array('assigns' => 
				array(
					'select' => false,
					'condition' => 'user_id=:id AND favorite=1',
					'params' => array(':id' => $userId)
			))
		));
		return $this;
	}
	/*get active projects for current user*/
	public function live($userId){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'dropped=0',
			'with' => array('assigns' => 
					array('select' => false, 
						  'condition'=>'user_id=:id AND favorite=0', 
						  'params' => array(':id' => $userId)
						)
			) 		 
		));
		return $this;
	}
	
	public function trashed(){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => 'dropped=1'
		));
		return $this;
	}
}