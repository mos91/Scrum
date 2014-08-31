<?php
class Sprint extends CActiveRecord {
	public $name;
	public $description;
	
	public $status;
	public $dropped = false;
<<<<<<< HEAD
	public $estimate;

	public $start_time;
	public $end_time;
	public $update_time;

=======
	
>>>>>>> d3dc502d6c8cde883854386db3515c6cdf9d0368
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
<<<<<<< HEAD
	
	public function scopes(){
		return array('byProject', 'planned', 'active', 'completed');
	}
	
	public function byProject($projectId){
		$this->getDbCriteria()->mergeWith(array(
				'condition' => '`t`.`project_id`=:project_id AND `t`.`dropped`=0', 
				'params' => array(':project_id' => $projectId)
		));

		return $this;
	}

	public function planned(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.status=:status AND `t`.dropped=0',
			'params' => array(':status' => SprintStatusCodes::PLANNED)
		));

		return $this;
	}

	public function active(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.status=:status AND `t`.dropped=0',
			'params' => array(':status' => SprintStatusCodes::CURRENT)
		));

		return $this;
	}

	public function completed(){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => '`t`.status=:status AND `t`.dropped=0',
			'params' => array(':status' => SprintStatusCodes::COMPLETED)
		));

		return $this;
	}

	public function relations(){
		return array(
			'project' => array(self::BELONGS_TO, 'Project', 'project_id'),
			'userstories' => array(self::HAS_MANY, 'UserStory', 'sprint_id')
=======

	public function relations(){
		return array(
			'project' => array(self::BELONGS_TO, 'Project', 'project_id')
			//'team' => array(self::MANY_MANY, 'UserRecord', 'user_issues_table(issue_id,user_id)')
>>>>>>> d3dc502d6c8cde883854386db3515c6cdf9d0368
		);
	}
}