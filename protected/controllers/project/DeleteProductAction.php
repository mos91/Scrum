<?php
class DeleteAction extends CAction {
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$product = Product::model()->deleteByPk(Yii::app()->request->restParams['id']);
		
		echo CJSON::encode(array('success' => true));
		Yii::app()->end();
	}
}