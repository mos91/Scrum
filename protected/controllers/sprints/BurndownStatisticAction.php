<?php
class BurndownStatisticAction extends CAction {
	private function checkIsIdExist(){
		if (!isset($_GET['id'])){
			throw new InvalidRestParamsException(500, $this->controller, "sprint id doesnt exist");
		}
	}

	public function run(){
		if (Yii::app()->request->isAjaxRequest){
			$this->onAjax();
		}
	}

	public function onAjax(){
		$request = Yii::app()->request;
		$this->checkIsIdExist();
		$id = $_GET['id'];

		$sprint = Sprint::model()->with(array('userstories' => array('scopes' => 'completedOrClosed', 'order' => 'complete_time ASC')))->findByPk($id);
		if (($sprint->status == SprintStatusCodes::COMPLETED) || ($sprint->status == SprintStatusCodes::CURRENT)){
			$payload = array('success' => true, 
			'start_time' => $sprint->start_time, 
			'end_time' => $sprint->end_time, 
			'estimate' => $sprint->estimate);

			$data = array();
			$sprint_estimate = $sprint->estimate;
			$data[] = array(
				'name' => 'Sprint start',
				'complete_time' => $sprint->start_time,
				'sprint_estimate' => $sprint->estimate
			);
			foreach($sprint->userstories as $id => $userstory){
				$data[] = array(
					'name' => $userstory->name, 
					'complete_time' => $userstory->complete_time, 
					'sprint_estimate' => ($sprint_estimate -= $userstory->estimate));
			}
			$payload['hits'] = $data;	
		}
		else{
			$payload = array('success' => false);
		}

		echo CJSON::encode($payload);
	}
}