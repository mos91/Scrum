<?php
class ProductForm extends CFormModel {
	public $name;
	public $description;
	
	public function rules(){
		return array(
				array('name,description', 'required')
			);
	}
}