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
		return array('byProject','bySprint', 
			'open', 'accepted', 'closed', 
			'todo', 'totest', 'done', 'completed', 'completedOrClosed');
	}
	
	public function byProject($projectId){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => '`t`.`project_id`=:project_id AND `t`.`dropped`=0', 
				'params' => array(':project_id' => $projectId)
		));

		return $this;
	}

	public function bySprint($sprintId){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => '`t`.sprint_id=:sprint_id AND `t`.`dropped`=0', 
				'params' => array(':sprint_id' => $sprintId)));
		return $this;
	}

	public function fromBacklog(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '(`t`.status=:status_open OR `t`.status=:status_accepted) AND `t`.dropped=0',
			'params' => array(
					':status_open' => UserStoryStatusCodes::OPEN, 
					':status_accepted' => UserStoryStatusCodes::ACCEPTED
				)
		));

		return $this;
	}

	public function fromSprints(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '(`t`.status<>:status_open AND `t`.status<>:status_accepted) AND `t`.dropped=0',
			'params' => array(
				':status_open' => UserStoryStatusCodes::OPEN, 
				':status_accepted' => UserStoryStatusCodes::ACCEPTED
			)
		));

		return $this;
	}

	public function open(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.status=:status AND `t`.dropped=0',
			'params' => array(':status' => UserStoryStatusCodes::OPEN)
		));

		return $this;
	}

	public function accepted(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.status=:status AND `t`.dropped=0',
			'params' => array(':status' => UserStoryStatusCodes::ACCEPTED)
		));

		return $this;
	}

	public function closed(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.status=:status AND `t`.dropped=0',
			'params' => array(':status' => UserStoryStatusCodes::CLOSED)
		));

		return $this;
	}
	
	public function todo(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.status=:status AND `t`.dropped=0',
			'params' => array(':status' => UserStoryStatusCodes::TODO)
		));

		return $this;
	}

	public function totest(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.status=:status AND `t`.dropped=0',
			'params' => array(':status' => UserStoryStatusCodes::TO_TEST)
		));

		return $this;
	}

	public function done(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.status=:status AND `t`.dropped=0',
			'params' => array(':status' => UserStoryStatusCodes::DONE)
		));

		return $this;
	}

	public function completed(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`'.$this->getTableAlias().'`.status=:status AND `'.$this->getTableAlias().'`.dropped=0',
			'params' => array(':status' => UserStoryStatusCodes::COMPLETED)
		));

		return $this;
	}	

	public function completedOrClosed(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '(`'.$this->getTableAlias().'`.status=:completed_status OR `'.$this->getTableAlias().'`.status=:closed_status) AND `'.$this->getTableAlias().'`.dropped=0',
			'params' => array(':completed_status' => UserStoryStatusCodes::COMPLETED, ':closed_status' => UserStoryStatusCodes::CLOSED)
		));

		return $this;
	}

	public function page($offset, $limit){	
		$this->getDbCriteria()->mergeWith(array(
			'limit' => $limit,
			'offset' => $offset
		));

		return $this;
	}

	public function relations(){
		return array(
			'project' => array(self::BELONGS_TO, 'Project', 'project_id'),
			'sprint' => array(self::BELONGS_TO, 'Sprint', 'sprint_id'),
			'comments' => array(self::HAS_MANY, 'UserStoryComment', 'userstory_id')
		);
	}
}