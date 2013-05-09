<?php
class UserStory extends CActiveRecord {
	public $name;
	public $description;
	
	public $estimate;
	public $priority;
	public $status;
	public $dropped = false;
	
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
		return array('byProject','bySprint', 'open', 'accepted', 'closed');
	}
	
	public function byProject($projectId){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => 'project_id=:project_id AND dropped=0', 
				'params' => array(':project_id' => $projectId)
		));

		return $this;
	}

	public function bySprint($sprintId){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => 'sprint_id=:sprint_id AND dropped=0', 
				'params' => array(':sprint_id' => $sprintId)));
		return $this;
	}

	public function open(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'status=:status',
			'params' => array(':status' => UserStoryStatusCodes::OPEN)
		));

		return $this;
	}

	public function accepted(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'status=:status',
			'params' => array(':status' => UserStoryStatusCodes::ACCEPTED)
		));

		return $this;
	}

	public function closed(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'status=:status',
			'params' => array(':status' => UserStoryStatusCodes::CLOSED)
		));

		return $this;
	}
	
	public function todo(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'status=:status',
			'params' => array(':status' => UserStoryStatusCodes::TODO)
		));

		return $this;
	}

	public function totest(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'status=:status',
			'params' => array(':status' => UserStoryStatusCodes::TO_TEST)
		));

		return $this;
	}

	public function done(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'status=:status',
			'params' => array(':status' => UserStoryStatusCodes::DONE)
		));

		return $this;
	}

	public function completed(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'status=:status',
			'params' => array(':status' => UserStoryStatusCodes::COMPLETED)
		));

		return $this;
	}	

	public function relations(){
		return array(
			'project' => array(self::BELONGS_TO, 'Project', 'project_id')
			//'team' => array(self::MANY_MANY, 'UserRecord', 'user_issues_table(issue_id,user_id)')
		);
	}
}