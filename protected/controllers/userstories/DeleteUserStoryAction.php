<?php
class DeleteUserStoryAction extends CAction {
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
		$this->safeDelete();
		echo CJSON::encode(array('success' => true));
		Yii::app()->end();
	}
	
	private function safeDelete(){
		$id = Yii::app()->request->restParams['id'];
		$transaction = Yii::app()->db->beginTransaction();
		try {
			IssueAssign::model()->deleteAll("issue_id=:issue_id", array(":issue_id" => $id));
			Issue::model()->deleteByPk($id);
			//вместе с задачей удал€ютс€ также все св€зи "пользователь-задача"
			$transaction->commit();
		}
		catch (Exception $e) {
			$transaction->rollback();
			throw new TransactionFailureException(500, $this->controller);
		}
	}
}