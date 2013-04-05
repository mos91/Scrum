<?php
class CreateUserStoryAction extends CAction {
	private function checkIsProjectExist(){
		$projectId = Yii::app()->user->getState('project-id');
		if (!isset($projectId)){
			throw new InvalidStateException(500, $this->controller, 'project Id doesnt exist');
		}
	}
	
	private function checkIsFormExist(){
		if (!isset(Yii::app()->request->restParams["UserStoryForm"])){
			throw new InvalidRestParamsException(500, $this->controller, "request params doesnt exist");
		}
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			if (Yii::app()->request->isAjaxRequest){
			 	$content = $this->controller->renderPartial('form', array('model' => $form), true);	
			 	echo CJSON::encode(array('error' => true, 'content' => $content));
			 	Yii::app()->end();
			}
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
		else {
			if (Yii::app()->request->isAjaxRequest){
				$this->controller->renderPartial('form', array('model' => new UserStoryForm));
			}
		}
	}
	
	private function onSubmit(){
		$this->checkIsProjectExist();
		$this->checkIsFormExist();
		$form = new UserStoryForm;
		$form->setAttributes(Yii::app()->request->restParams["UserStoryForm"], false);
		$this->checkFormIsValid($form);
		$userStory = new UserStory;
		$userStory->setAttributes($form->attributes,false);
		$userStory->project_id = Yii::app()->user->getState('project-id');
		$userStory->save();
		
		echo CJSON::encode(array('userStory' => $userStory->getAttributes()));
		Yii::app()->end();
	}
}