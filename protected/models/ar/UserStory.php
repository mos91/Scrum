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
		return array('open', 'accepted', 
			'assigned', 'todo', 'totest', 
			'done', 'completed', 'old', 'all', 'inprogress');
	}
	
	public function byProject($projectId){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => 'project_id=:project_id AND dropped=0', 
				'params' => array(':project_id' => $projectId)));
		return $this;
	}

	private function getGroupDbCriteria($status, $projectId, $sprintId){
		if (!isset($projectId))
			return array();

		$dbCriteria = array(
			'condition' => 'project_id=:project_id',
			'params' => array(
				':project_id' => $projectId
			)
		);

		$dbCriteria['condition'] .= ' AND status=:status AND dropped=0';
		$dbCriteria['params'][':status'] = $status;

		return $dbCriteria;
	}

	public function open($projectId){
		$this->getDbCriteria()->mergeWith($this->getGroupDbCriteria(UserStoryStatusCodes::OPEN, $projectId));
		return $this;
	}

	public function accepted($projectId){
		$this->getDbCriteria()->mergeWith($this->getGroupDbCriteria(UserStoryStatusCodes::ACCEPTED, $projectId));
		return $this;
	}

	public function inprogress($projectId){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'project_id=:project_id AND (status && :mask) = 1',
			'params' => array(':project_id' => $projectId, ':mask' => UserStoryStatusCodes::IN_PROGRESS_MASK)
		));
		return $this;
	}

	public function assigned($projectId, $sprintId){
		$this->getDbCriteria()->mergeWith($this->getGroupDbCriteria(UserStoryStatusCodes::ASSIGNED_TO_SPRINT, $projectId, $sprintId));
		return $this;
	}	
	
	public function todo($projectId){
		$this->getDbCriteria()->mergeWith($this->getGroupDbCriteria(UserStoryStatusCodes::TODO, $projectId, $sprintId));
		return $this;
	}

	public function totest($projectId){
		$this->getDbCriteria()->mergeWith($this->getGroupDbCriteria(UserStoryStatusCodes::TO_TEST, $projectId, $sprintId));
		return $this;
	}

	public function done($projectId){
		$this->getDbCriteria()->mergeWith($this->getGroupDbCriteria(UserStoryStatusCodes::DONE, $projectId, $sprintId));
		return $this;
	}

	public function completed($projectId){
		$this->getDbCriteria()->mergeWith($this->getGroupDbCriteria(UserStoryStatusCodes::COMPLETED, $projectId, $sprintId));
		return $this;
	}

	public function old($projectId){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'project_id=:project_id AND status=:status AND dropped=0',
			'params' => array(':project_id' => $project_id, ':status' => UserStoryStatusCodes::SPRINT_COMPLETED)
		));
	}

	public function all($projectId){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'project_id=:project_id AND dropped=0',
			'params' => array(':project_id' => $projectId)
		));
		return $this;
	}

	public function trashed($projectId){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => 'project_id=:project_id AND dropped=1',
				'params' => array(':project_id' => $projectId)
		));
		return $this;
	}

	public function relations(){
		return array(
			'project' => array(self::BELONGS_TO, 'Project', 'project_id'),
			'sprint' => array(self::BELONGS_TO, 'Sprint', 'sprint_id')
			//'team' => array(self::MANY_MANY, 'UserRecord', 'user_issues_table(issue_id,user_id)')
		);
	}
}