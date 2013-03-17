<?php
class DeleteIssueAction extends CAction {
	private function checkIsIdExist(){
		if (!isset(Yii::app()->request->restParams['id'])){
			throw new InvalidRestParamsException(500, $this->controller, 'Id doesnt exist');
		}	
	}
	
	public function run(){
		if (Yii::app()->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$this->checkIsIdExist();
		Issue::model()->deleteByPk(Yii::app()->request->restParams['id']);
		echo CJSON::encode(array('success' => true));
		Yii::app()->end();
	}
}