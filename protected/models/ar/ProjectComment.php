<?php
class ProjectComment extends CActiveRecord {
	public $content;
	public $post_date;

	public static function model($className=__CLASS__){
		return parent::model($className);
	}
	
	public function tableName(){
		return 'project_comments_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array(
			'project' => array(self::BELONGS_TO, 'Project', 'project_id'),
			'author' => array(self::BELONGS_TO, 'UserRecord', 'author_id')
		);
	}
	
	public function scopes(){
		return array(
			'byProject',
			'since'
		);
	}
	
	public function byProject($projectId){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'project_id=:id',
			'params' => array(':id' => $projectId)
		));
		return $this;
	}

	public function since($lastDays = 7){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'TIMESTAMP_DIFF(DAY,post_date,NOW()) <= :lastdays',
			'params' => array(':lastdays' => $lastDays)
		));

		return $this;
	}
}