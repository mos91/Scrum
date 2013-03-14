<?php
class Product extends CActiveRecord {
	public $name;
	public $description;
	public $company;
	
	public static function model($className=__CLASS__){
		return parent::model($className);
	}
	
	public function tableName(){
		return 'product_table';
	}
	
	public function primaryKey(){
		return 'id';
	}
	
	public function relations(){
		return array(
			'company' => array(self::BELONGS_TO, 'Company', 'company_id')
		);
	}
}