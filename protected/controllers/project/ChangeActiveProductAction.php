<?php
class ChangeActiveProductAction extends CAction {
	private function checkIsIdExist(){
		if (!isset(Yii::app()->request->restParams['id'])){
			throw new InvalidRestParamsException(500, $this->controller, "Id doesnt exist");
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$this->checkIsIdExist();
		$projectId = Yii::app()->request->restParams['id'];
		UserRecord::model()->updateByPk(Yii::app()->user->getState('user-id'), array('active_project_id' => $projectId));
		Yii::app()->user->setState('product-id', $projectId);
		echo CJSON::encode(array('success' => true));
	}
}