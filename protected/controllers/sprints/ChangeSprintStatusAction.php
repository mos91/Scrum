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
		if (isset($_POST['newStatus'])){
			throw new InvalidRestParamsException(500, $this->controller, "new status doesnt exist");
		}
	}

	private function onAjax(){
		$request = Yii::app()->request;
		$payload = array();

		$this->checkIsIdExist();
		$this->checkStatuses();
		$payload = array('success' => true, 'sprint' => array());
		$id = $_GET['id'];

		$oldStatus = $_GET['oldStatus'];
		$newStatus = $_GET['newStatus'];
		if ($newStatus === 'dropped' || $newStatus === 'restored'){
			if ($newStatus === 'dropped'){
				$this->dropSprint();
				$payload['sprint']['dropped'] = true;
			}
			else if ($newStatus === 'restored'){
				$this->restoreSprint();
				$payload['sprint']['dropped'] = false;
			}

			$payload['sprint'] = array_merge($payload['sprint'], array('id' => $_GET['id']));
		}
		else if (is_numeric($_GET['newStatus'])){
			$oldStatus = (int)$oldStatus;
			$newStatus = (int)$newStatus;
			if ($oldStatus === SprintStatusCodes::PLANNED && $newStatus === SprintStatusCodes::CURRENT){
				$sprint = $this->startSprint();
				$payload['sprint']['start_time'] = $sprint->start_time;
			}
			else if ($oldStatus === SprintStatusCodes::CURRENT && $newStatus === SprintStatusCodes::PLANNED){
				$sprint = $this->stopSprint();
			}
			else if ($oldStatus === SprintStatusCodes::CURRENT && $newStatus === SprintStatusCodes::COMPLETED){
				$sprint = $this->completeSprint();
				$payload['sprint']['end_time'] = $sprint->end_time;
			}
			
			$payload['sprint'] = array_merge($payload['sprint'], array('id' => $sprint->id, 'status' => $sprint->status, 'update_time' => $sprint->update_time));
		}

		echo CJSON::encode($payload);
	}

	private function startSprint(){
		$update_time = new DateTime();

		$activeSprint = Sprint::model()->active()->find();
		$this->stopSprint($activeSprint);

		$sprintId = $_GET['id'];
		$sprint = Sprint::model()->findByPk($sprintId);
		$allUserstoriesCount = UserStory::model()->bySprint($sprintId)->count();
		if (!empty($allUserstoriesCount)){
			$sprint->status = SprintStatusCodes::CURRENT;
			$sprint->update_time = $update_time->getTimestamp();
			$sprint->start_time = $update_time->getTimestamp();
			$sprint->save();
		}
	
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
		
		UserStory::model()->bySprint($sprintId)->updateAll(array('status' => UserStoryStatusCodes::TODO, 'complete_time' => null));
		$sprint->status = SprintStatusCodes::PLANNED;
		$sprint->update_time = $update_time->getTimestamp();
		$sprint->start_time = null;
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
			$sprint->end_time = $update_time->getTimestamp();
			$transaction = Yii::app()->db->beginTransaction();
			try {
				$sprint->save();	
				$sprintUserstories = UserStory::model()->bySprint($_GET['id'])->updateAll(array('status' => UserStoryStatusCodes::CLOSED));	
				$transaction->commit();
			}
			catch (Exception $e){
				$transaction->rollback();
				throw TransactionFailureException(500, $this->controller);
			}	
		}

		return $sprint;
	}

	private function dropSprint(){
		$sprintId = $_GET['id'];
		Sprint::model()->updateByPk($sprintId, array('dropped' => true));
	}

	private function restoreSprint(){
		$sprintId = $_GET['id'];
		Sprint::model()->updateByPk($sprintId, array('dropped' => false));
	}
}
