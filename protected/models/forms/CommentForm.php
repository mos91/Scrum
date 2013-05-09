<?php
class CommentForm extends CFormModel {
	public $content;
	
	public function rules(){
		return array(
				array('content', 'required')
			);
	}
}