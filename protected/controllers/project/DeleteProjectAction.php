<?php
class DeleteProjectAction extends CAction {
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
		$this->safeDelete();
		
		echo CJSON::encode(array('success' => true));
		Yii::app()->end();
	}
	
	private function safeDelete(){
		$transaction = Yii::app()->db->beginTransaction();
		$id = Yii::app()->request->restParams['id'];
		try {
			Issue::model()->deleteAll("product_id=:product_id", array(":product_id" => $id));
			IssueAssign::model()->deleteAll("product_id=:product_id", array(":product_id" => $id));
			ProductAssign::model()->deleteAll("product_id=:product_id", array(":product_id" => $id));
			Product::model()->deleteByPk($id);
			Yii::app()->user->setState('product-id', null);
			$transaction->commit();
		}
		catch (Exception $e) {
			$transaction->rollback();
			throw TransactionFailureException(500, $this->controller);		
		}
	}
}