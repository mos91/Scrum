<?php
class CreateIssueAction extends CAction {
	private function checkIsProductExist(){
		$productId = Yii::app()->user->getState('product-id');
		if (!isset($productId)){
			throw new InvalidStateException(500, $this->controller, 'product Id doesnt exist');
		}
	}
	
	private function checkIsFormExist(){
		if (!isset(Yii::app()->request->restParams["IssueForm"])){
			throw new InvalidRestParamsException(500, $this->controller, "request params doesnt exist");
		}
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			throw new InvalidRestParamsException(200, $this->controller, $form->errors);
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$this->checkIsProductExist();
		$this->checkIsFormExist();
		$form = new IssueForm;
		$form->setAttributes(Yii::app()->request->restParams["IssueForm"], false);
		$this->checkFormIsValid($form);
		$issue = new Issue;
		$issue->setAttributes($form->attributes,false);
		$issue->product_id = Yii::app()->user->getState('product-id');
		$issue->save();
		
		echo CJSON::encode(array('success' => true, 'issue' => $issue));
		Yii::app()->end();
	}
}