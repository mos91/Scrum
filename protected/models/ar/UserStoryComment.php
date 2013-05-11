<?php
class UserStoryComment extends CActiveRecord {
	public $content;
	public $post_date;

	public static function model($className=__CLASS__){
		return parent::model($className);
	}
	
	public function tableName(){
		return 'userstory_comments_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array(
			'userstory' => array(self::BELONGS_TO, 'Userstory', 'userstory_id'),
			'author' => array(self::BELONGS_TO, 'UserRecord', 'author_id')
		);
	}
	
	public function scopes(){
		return array(
			'byProject',
			'since'
		);
	}
	
	public function byUserstory($userstoryId){
		$this->getDbCriteria()->mergeWith(array(
			'condition' => 'userstory_id=:id',
			'params' => array(':id' => $userstoryId)
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