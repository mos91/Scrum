<?php
class UserStory extends CActiveRecord {
	public $name;
	public $description;
	//public $project;
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
		return 'user_story_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function scopes(){
		return array('byProject');
	}
	
	public function byProject($projectId){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => 'project_id=:project_id AND dropped=0', 
				'params' => array(':project_id' => $projectId)));
		return $this;
	}
	
	public function relations(){
		return array(
			'project' => array(self::BELONGS_TO, 'Project', 'project_id')
			//'team' => array(self::MANY_MANY, 'UserRecord', 'user_issues_table(issue_id,user_id)')
		);
	}
}