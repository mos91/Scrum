<?php 
class ChangeSprintStatusAction extends CAction {
	public function run(){
		if (Yii::app()->request->isAjaxRequest){
			$this->onAjax();
		}
	}

	private function checkIsIdExist(){
		$rest = Yii::app()->request->restParams;

		if (!isset($_GET['id'])){
			throw new InvalidRestParamsException(500, $this->controller, "sprint id doesnt exist");
		}
	}

	private function checkStatuses(){
		if (!isset($_GET['oldStatus']) || !isset($_GET['newStatus'])){
			throw new InvalidRestParamsException(500, $this->controller, "old or new statues doesnt exist");
		}
	}

	private function onAjax(){
		$request = Yii::app()->request;
		
		$this->checkIsIdExist();
		$this->checkStatuses();
		$id = $_GET['id'];
		$oldStatus = (int)$_GET['oldStatus'];
		$newStatus = (int)$_GET['newStatus'];

		if ($oldStatus === SprintStatusCodes::PLANNED && $newStatus === SprintStatusCodes::CURRENT){
			$sprint = $this->startSprint();
		}
		else if ($oldStatus === SprintStatusCodes::CURRENT && $newStatus === SprintStatusCodes::PLANNED){
			$sprint = $this->stopSprint();
		}
		else if ($oldStatus === SprintStatusCodes::CURRENT && $newStatus === SprintStatusCodes::COMPLETED){
			$sprint = $this->completeSprint();
		}

		echo CJSON::encode(array('success' => true, 'sprint' => array('id' => $sprint->id, 'status' => $sprint->status, 'update_time' => $sprint->update_time)));
	}

	private function startSprint(){
		$update_time = new DateTime();

		$activeSprint = Sprint::model()->active()->find();
		$this->stopSprint($activeSprint);

		$sprint = Sprint::model()->findByPk($_GET['id']);
		
		$sprint->status = SprintStatusCodes::CURRENT;
		$sprint->update_time = $update_time->getTimestamp();
		$sprint->save();

		return $sprint;
	}

	private function stopSprint($sprint = null){
		$update_time = new DateTime();

		if (!isset($sprint)){
			$sprintId = $_GET['id'];
			$sprint = Sprint::model()->findByPk($sprintId);
		}
		else {
			$sprintId = $sprint->id;
		}
		
		UserStory::model()->bySprint($sprintId)->updateAll(array('status' => UserStoryStatusCodes::TODO));
		$sprint->status = SprintStatusCodes::PLANNED;
		$sprint->update_time = $update_time->getTimestamp();
		$sprint->save();

		return $sprint;
	}

	private function completeSprint(){
		$update_time = new DateTime();

		$sprintId = $_GET['id'];
		$sprint = Sprint::model()->findByPk($sprintId);
		$allUserstoriesCount = UserStory::model()->bySprint($sprintId)->count();
		$completedUserstoriesCount = UserStory::model()->bySprint($sprintId)->completed()->count();
		if (!empty($allUserstoriesCount) && ($allUserstoriesCount === $completedUserstoriesCount)){
			$sprint->status = SprintStatusCodes::COMPLETED;
			$sprint->update_time = $update_time->getTimestamp();
			$sprint->save();	
		}

		return $sprint;
	}
}
