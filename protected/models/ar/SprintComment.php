<?php
class SprintComment extends CActiveRecord {
	public $content;
	public $post_date;

	public static function model($className=__CLASS__){
		return parent::model($className);
	}
	
	public function tableName(){
		return 'sprint_comments_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array(
			'sprint' => array(self::BELONGS_TO, 'Sprint', 'sprint_id'),
			'author' => array(self::BELONGS_TO, 'UserRecord', 'author_id')
		);
	}
	
	public function scopes(){
		return array(
			'bySprint',
			'since'
		);
	}
	
	public function bySprint($sprintId){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'sprint_id=:id',
			'params' => array(':id' => $sprintId)
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