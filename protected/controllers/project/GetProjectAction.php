<?php
class GetProjectAction extends CAction {
	public function run(){
		$this->onAjax();
	}
	
	public function onAjax(){
		$request = Yii::app()->request;
		$userId = Yii::app()->user->getState('user-id');
		//$result = array('success' => true);

		/*$handleOptions = array(
			'live' => array('respGroup' => 'projects', ''),
			'favorite' => 'projects',
			'trashed' => 'projects',
			'active' => 'projects',
			'comments' => 'comments'
		);
		foreach($_GET as $key => $value){
			if (isset($value) && !empty($value) && isset($responseGroup = $handleOptions[$key])){
				$feederName = 'fetch' + ucfirst($key);
				$result[$responseGroup] = call_user_func(array($this, $feederName));
			}
		}*/

		if (isset($_GET['live'])){
			$result = $this->fetchLive($userId);
		} 
		else if (isset($_GET['favorite'])){
			$result = $this->fetchFavorites($userId);
		}
		else if (isset($_GET['trashed'])){
			$result = $this->fetchTrashed($userId);
		}
		else if (isset($_GET['backlogSummary'])){
			$result = $this->fetchBacklogSummary();
			$summary = true;
		}
		else if (isset($_GET['comments'])){
			$result = $this->fetchComments();
			$comments = true;
		}
		else if (isset($_GET['sprintSummary'])){
			$result = $this->fetchSprintSummary();
			$summary = true;
		}
		else if (isset($_GET['id']) && is_numeric($_GET['id'])){
			$result = $this->fetchSingle();
			$single = true;			
		}
		else {
			$result = $this->fetchActive();
			$single = true;
		}

		if (isset($single) && $single === true){
			echo CJSON::encode(array('success' => true, 'project' => $result));	
		}
		else if (isset($comments) && $comments === true){
			echo CJSON::encode(array('success' => true, 'totalCount' => count($result), 'comments' => $result));
		}
		else if (isset($summary) && $summary === true){
			echo CJSON::encode(array('success' => true, 'summary' => $result));
		}
		else {
			echo CJSON::encode(array('success' => true, 'projects' => $result));	
		}
	}

	private function fetchLive($userId){
		$jsonResult = array();
		
		$result = Project::model()->byUser($userId)->live()->findAll();
		foreach($result as $id => $record){
			$jsonResult[$id] = $record->getAttributes();
		}
		return $jsonResult;
	}

	private function fetchFavorites($userId){
		$jsonResult = array();
		
		$result = Project::model()->favorite($userId)->findAll();
		foreach($result as $id => $record){
			$jsonResult[$id] = $record->getAttributes();
		}
		return $jsonResult;
	}

	private function fetchTrashed(){
		$jsonResult = array();
		$userId = Yii::app()->request->user->getState('user-id');
		$result = Project::model()->byUser($userId)->trashed()->findAll();
		foreach($result as $id => $record){
			$jsonResult[$id] = $record->getAttributes();
		}
		return $jsonResult;
	}

	private function fetchComments(){
		$jsonResult = array();

		$comments = ProjectComment::model()->byProject($_GET['id'])->with('author')->findAll();
		foreach($comments as $id => $record){
			$jsonResult[$id] = $record->getAttributes();
			$author = $record->getRelated('author');
			$jsonResult[$id]['author'] = $author->firstname.' '.$author->lastname;
		}

		return $jsonResult;
	}

	private function fetchBacklogSummary(){
		$openCount = UserStory::model()->byProject($_GET['id'])->open()->count();
		$acceptedCount = UserStory::model()->byProject($_GET['id'])->accepted()->count();
		$closedCount = UserStory::model()->byProject($_GET['id'])->closed()->count();
		$total = $openCount + $acceptedCount + $closedCount;

		return array(
			'total' => $total,
			'open' => $openCount,
			'accepted' => $acceptedCount,
			'closed' => $closedCount);
	}

	private function fetchSprintSummary(){
		$todoCount = UserStory::model()->bySprint($_GET['id'])->todo()->count();
		$totestCount = UserStory::model()->bySprint($_GET['id'])->totest()->count();
		$doneCount = UserStory::model()->bySprint($_GET['id'])->done()->count();
		$completedCount = UserStory::model()->bySprint($_GET['id'])->completed()->count();
		$total = $todoCount + $totestCount + $doneCount + $completedCount;

		return array(
			'total' => $total,
			'todo' => $todoCount, 'totest' => $totestCount, 
			'done' => $doneCount, 'completed' => $completedCount
		);	
	}

	private function fetchSingle(){
		$result = Project::model()->findByPk($_GET['id']);
		return $result->getAttributes();
	}

	private function fetchActive(){
		$result = Project::model()->findByPk(Yii::app()->user->getState("project-id"));
		return $result->getAttributes();
	}
}