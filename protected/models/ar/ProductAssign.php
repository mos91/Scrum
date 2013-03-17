<?php
//связь "пользователь-проект"
class ProductAssign extends CActiveRecord {
	public $user;
	public $product;
	
	public static function model($className=__CLASS__){
		return parent::model($className);
	}
	
	public function tableName(){
		return 'user_projects_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array(
			'user' => array(self::HAS_ONE, 'UserRecord', 'user_id'),
			'product' => array(self::HAS_ONE, 'Product', 'product_id')
		);
	}
}