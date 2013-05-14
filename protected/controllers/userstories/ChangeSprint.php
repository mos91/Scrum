<?php 
class ChangeSprint extends CAction {
	public function run(){
		if (Yii::app()->request->isAjaxRequest){
			$this->onAjax();
		}
	}

	private function checkIsIdExist(){
		if (!isset($_GET['id'])){
			throw new InvalidRestParamsException(500, $this->controller, "userstory id doesnt exist");
		}
	}

	private function onAjax(){
		$this->checkIsIdExist();
		if (isset($_GET['detach'])){
			$this->detachFromSprint();
		}
		else if (isset($_GET['sprint_id'])){
			$this->attachToSprint();
		}
	}

	private function detachFromSprint(){
		$update_time = new DateTime();

		$id = $_GET['id'];
		$userstory = UserStory::model()->findByPk($id);
		$userstory->status = $status = UserStoryStatusCodes::OPEN;
		$userstory->sprint_id = null;
		$userstory->update_time = $update_time->getTimestamp();
		$userstory->save();

		echo CJSON::encode(array('success' => true, 
			'userstory' => array(
				'id' => $userstory->id,
				'status' => $status, 
				'update_time' => $update_time,
				'sprint_group_field' => ''
			)));
	}

	private function attachToSprint(){
		$update_time = new DateTime();

		$id = $_GET['id'];
		$userstory = UserStory::model()->findByPk($id);
		$userstory->status = $status = UserStoryStatusCodes::TODO;
		$userstory->sprint_id = $_GET['sprint_id'];
		$userstory->update_time = $update_time->getTimestamp();
		$userstory->save();
		$sprint = $userstory->getRelated('sprint');

		echo CJSON::encode(array('success' => true, 'userstory' => array(
			'id' => $userstory->id, 
			'sprint' => $sprint->getAttributes(array('id', 'name')), 
			'status' => $status, 'update_time' => $userstory->update_time,
			'sprint_group_field' => $sprint->name
			)));
	}
}
