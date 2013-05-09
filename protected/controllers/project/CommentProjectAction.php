<?php
class CommentProjectAction extends CAction {
	private function checkIsAuthorIdExist(){
		$rest = Yii::app()->request->restParams;

		if (!isset($rest['author_id'])){
			throw new InvalidRestParamsException(500, $this->controller, "author id doesnt exist");
		}
	}

	private function checkIsProjectIdExist(){
		$rest = Yii::app()->request->restParams;

		if (!isset($rest['project_id'])){
			throw new InvalidRestParamsException(500, $this->controller, 'project id doesnt exist');
		}
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			throw new InvalidRestParamsException(500, $this->controller, "request params are invalid");		
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$rest = Yii::app()->request->restParams;
		$post_date = new DateTime();

		$this->checkIsAuthorIdExist();
		$this->checkIsProjectIdExist();
		$form = new CommentForm;
		$form->setAttributes(Yii::app()->request->restParams,false);
		$this->checkFormIsValid($form);
		
		$projectComment = new ProjectComment;
		$projectComment->author_id = $rest['author_id'];
		$projectComment->project_id = $rest['project_id'];
		$projectComment->post_date = $post_date->getTimestamp();
		$projectComment->setAttributes($form->attributes, false);
		$projectComment->save();
		
		$result = array(
			'success' => true,
			'comment' => array('id' => $projectComment->id, 
			'post_date' => $projectComment->post_date)
			);

		echo CJSON::encode($result);
		Yii::app()->end();
	}
}