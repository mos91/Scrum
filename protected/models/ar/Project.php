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
			'comments' => array(self::HAS_MANY, 'ProjectComment', 'project_id'),
			'active_sprint' => array(self::BELONGS_TO, 'Sprint', 'active_sprint_id')
		);
	}
	
	public function scopes(){
		return array(
			'byUser',
			'byCompany',
			'live',
			'trashed',
			'favorite'
		);
	}
	
	public function byUser($userId){
		$this->getDbCriteria()->mergeWith(array(
			'with' => array(
				'users' => array(
					'select' => false, 
					'condition' => 'users.id=:id', 
					'params' => array(':id' => $userId))
			)
			));
		return $this;
	}

	public function byCompany($companyId){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'company_id=:id',
			'params' => array(':id' => $companyId)
		));
		return $this;	
	}

	public function live(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.dropped=0' 		 
		));
		return $this;
	}
	
	public function trashed(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.dropped=1',
		));
		return $this;
	}

	public function favorite(){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => '`t`.dropped=0',
				'with' => array('users' =>
						array('select' => false,
							'condition'=>'favorite=1'
						)
				)
		));

		return $this;
	}	
}