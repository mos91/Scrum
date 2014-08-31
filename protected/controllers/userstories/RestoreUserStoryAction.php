<?php
class RestoreUserStoryAction extends CAction {
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$request = Yii::app()->request;
		if (isset($request->restParams['ids'])){
			$ids = Yii::app()->request->restParams['ids'];

			UserStory::model()->updateByPk($ids, array('dropped' => false));
			$userstories = UserStory::model()->findAllByAttributes(array('id' => $ids));
			
			echo CJSON::encode(array('success' => true, 'data' => $projects));
			Yii::app()->end();	
		}
		else if (isset($request->restParams['id'])){
			$id = Yii::app()->request->restParams['id'];
			
			$userstory = UserStory::model()->findByPk($id);
			$userstory->dropped = false;
			$userstory->save();

			echo CJSON::encode(array('success' => true, 'data' => array($userstory)));
			Yii::app()->end();
		}
		else {
			throw new InvalidRestParamsException(500, $this->controller, 'Request parameters doesnt exist');
		}
	}
} 