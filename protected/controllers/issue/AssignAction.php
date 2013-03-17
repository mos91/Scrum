<?php
class AssignAction extends CAction {
	private function checkIsIdsExist(){
		if (!isset(Yii::app()->request->restParams['user_id'])){
			throw new InvalidRestParamsException(500, $this->controller, 'User Id doesnt exist');
		}
		if (!isset(Yii::app()->request->restParams['issue_id'])){
			throw new InvalidRestParamsException(500, $this->controller, 'Issue Id doesnt exist');
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$this->checkIsIdsExist();
		$assign = new IssueAssign;
		$assign->issue_id = Yii::app()->request->restParams["issue_id"];
		$assign->user_id = Yii::app()->request->restParams["user_id"];
		$assign->save();
		echo CJSON::encode(array('success' => true));
		Yii::app()->end();
	}
}