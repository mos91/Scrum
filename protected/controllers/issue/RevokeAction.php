<?php
class RevokeAction extends CAction {	
	private function checkIsIdExist(){
		if (!isset(Yii::app()->request->restParams['id'])){
			throw new InvalidRestParamsException(500, $this->controller, 'Id doesnt exist');
		}	
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}	
	
	private function onSubmit(){
		$this->checkIsIdExist();
		$id = Yii::app()->request->restParams['id'];
		IssueAssign::model()->deleteByPk($id);
		echo CJSON::encode(array('success' => true));
		Yii::app()->end();
	}
}