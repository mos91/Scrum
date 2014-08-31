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
		

		$this->checkIsIdExist();
		$this->checkStatuses();
		$oldStatus = (int)$_GET['oldStatus'];
		$newStatus = (int)$_GET['newStatus'];

		$payload = array('success' => true, 'userstory' => array());
		if ($oldStatus === UserStoryStatusCodes::DONE && $newStatus === UserStoryStatusCodes::COMPLETED){
			$userstory = $this->completeUserStory();
			$payload['userstory']['complete_time'] = $userstory->complete_time;
		}
		else {
			$userstory = $this->changeStatus();
		}
		$payload['userstory'] = array_merge($payload['userstory'], array('id' => $userstory->id, 'status' => $newStatus, 'update_time' => $userstory->update_time));

		echo CJSON::encode($payload);
	}

	private function completeUserStory(){
		$update_time = new DateTime();

		$userstory = UserStory::model()->findByPk($_GET['id']);
		$userstory->status = UserStoryStatusCodes::COMPLETED;
		$userstory->update_time = $update_time->getTimestamp();
		$userstory->complete_time = $update_time->getTimestamp();
		$userstory->save();

		return $userstory;
	}

	private function changeStatus(){
		$update_time = new DateTime();

		$userstory = UserStory::model()->findByPk($_GET['id']);
		$userstory->status = (int)$_GET['newStatus'];
		$userstory->update_time = $update_time->getTimestamp();
		$userstory->save();

		return $userstory;
	}
}
