<?php
class ProjectForm extends CFormModel {
	public $name;
	public $description;
	
	public function rules(){
		return array(
				array('name', 'required')
			);
	}
}