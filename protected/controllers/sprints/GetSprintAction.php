<?php
class GetSprintAction extends CAction {
	public function run(){
		if (Yii::app()->request->isAjaxRequest){
			$this->onAjax();
		}
	}

	public function onAjax(){
		$request = Yii::app()->request;

		if (isset($_GET['project_id'])){
			$sprints = Sprint::model()->byProject($_GET['project_id'])->findAll();
			$total = Sprint::model()->byProject($_GET['project_id'])->count();
			$jsonResult = array();
			foreach($sprints as $id => $record){
				$jsonResult[$id] = $record->getAttributes(array('id', 'name','description', 'update_time'));
			}
		}
		else if (isset($_GET['sprint_id'])){
			$sprint = Sprint::model()->findByPk($_GET['sprint_id']);
			$jsonResult = $sprint->getAttributes();
			$single = true;
		}

		$payload = array('success' => true);
		if (isset($single) && !empty($single)){
			$payload['sprint'] = $jsonResult;
			
			echo CJSON::encode($payload);
		}
		else {
			$payload['sprints'] = $jsonResult;
			if (isset($page) && !empty($page))
				$payload['total'] = $total;

			echo CJSON::encode($payload);
		}
	}
}