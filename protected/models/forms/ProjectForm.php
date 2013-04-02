<?php
class ProjectForm extends CFormModel {
	public $name;
	public $description;
	public $makeActive;
	
	public function rules(){
		return array(
				array('name', 'required'),
				array('makeActive', 'boolean')
			);
	}
}