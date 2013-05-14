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
	
	public function scopes(){
		return array('byProject');
	}
	
	public function byProject($projectId){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => '`t`.`project_id`=:project_id AND `t`.`dropped`=0', 
				'params' => array(':project_id' => $projectId)
		));

		return $this;
	}

	public function relations(){
		return array(
			'project' => array(self::BELONGS_TO, 'Project', 'project_id')
		);
	}
}