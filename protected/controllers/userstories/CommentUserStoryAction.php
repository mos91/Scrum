<?php
class CommentUserStoryAction extends CAction {
	private function checkIsAuthorIdExist(){
		$rest = Yii::app()->request->restParams;

		if (!isset($rest['author_id'])){
			throw new InvalidRestParamsException(500, $this->controller, "author id doesnt exist");
		}
	}

	private function checkIsUserStoryIdExist(){
		$rest = Yii::app()->request->restParams;

		if (!isset($rest['userstory_id'])){
			throw new InvalidRestParamsException(500, $this->controller, 'userstory id doesnt exist');
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
		$this->checkIsUserStoryIdExist();
		$form = new CommentForm;
		$form->setAttributes(Yii::app()->request->restParams,false);
		$this->checkFormIsValid($form);
		
		$userstoryComment = new UserStoryComment;
		$userstoryComment->author_id = $rest['author_id'];
		$userstoryComment->userstory_id = $rest['userstory_id'];
		$userstoryComment->post_date = $post_date->getTimestamp();
		$userstoryComment->setAttributes($form->attributes, false);
		$userstoryComment->save();
		
		$result = array(
			'success' => true,
			'comment' => array('id' => $userstoryComment->id, 
			'post_date' => $projectComment->post_date)
			);

		echo CJSON::encode($result);
		Yii::app()->end();
	}
}