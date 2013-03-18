<?php
class DropProductAction extends CAction {
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
		Product::model()->updateByPk(Yii::app()->request->restParams['id'], array('dropped' => true));
		echo CJSON::encode(array('success' => true));
		Yii::app()->end();
	}
} 