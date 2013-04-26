<?php
class UserStory extends CActiveRecord {
	public $name;
	public $description;
	
	public $estimate;
	public $priority;
	public $status;
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
		return array('byProject','new', 'accepted');
	}
	
	public function byProject($projectId){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => 'project_id=:project_id AND dropped=0', 
				'params' => array(':project_id' => $projectId)));
		return $this;
	}

	public function new(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'status=:status',
			'params' => array(':status' => UserStoryStatusCodes::NEW)
		));
	}

	public function accepted(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'status=:status',
			'params' => array(':status' => UserStoryStatusCodes::ACCEPTED)
		));
	}
	
	public function relations(){
		return array(
			'project' => array(self::BELONGS_TO, 'Project', 'project_id')
			//'team' => array(self::MANY_MANY, 'UserRecord', 'user_issues_table(issue_id,user_id)')
		);
	}
}