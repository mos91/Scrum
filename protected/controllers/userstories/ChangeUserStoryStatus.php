<?php 
class ChangeUserStoryStatus extends CAction {
	public function run(){
		if (Yii::app()->request->isAjaxRequest){
			$this->onAjax();
		}
	}

	private function checkIsIdExist(){
		//$rest = Yii::app()->request->restParams;

		if (!isset($_GET['id'])){
			throw new InvalidRestParamsException(500, $this->controller, "userstory id doesnt exist");
		}
	}

	private function checkStatuses(){
		//$rest = Yii::app()->request->restParams;

		if (!isset($_GET['oldStatus']) || !isset($_GET['newStatus'])){
			throw new InvalidRestParamsException(500, $this->controller, "old or new statues doesnt exist");
		}
	}

	private function onAjax(){
		$request = Yii::app()->request;
		$update_time = new DateTime();

		$this->checkIsIdExist();
		$this->checkStatuses();
		$id = $_GET['id'];
		$oldStatus = $_GET['oldStatus'];
		$newStatus = $_GET['newStatus'];

		$userstory = UserStory::model()->findByPk($id);
		$userstory->status = (int)$newStatus;
		$userstory->update_time = $update_time->getTimestamp();
		$userstory->save();

		echo CJSON::encode(array('success' => true, 'userstory' => array('id' => $userstory->id, 'status' => $newStatus, 'update_time' => $update_time)));
	}
}
