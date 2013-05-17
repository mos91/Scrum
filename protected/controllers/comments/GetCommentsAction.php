<?php 
class GetCommentsAction extends CAction {
	public function run(){
		$this->onAjax();
	}

	public function onAjax(){
		if (isset($_GET['project_id'])){
			$result = $this->fetchProjectComments();
			echo CJSON::encode(array('success' => true, 'total' => count($result), 'comments' => $result));
		}
		else if (isset($_GET['userstory_id'])){
			$result = $this->fetchUserStoryComments();
			echo CJSON::encode(array('success' => true, 'total' => count($result), 'comments' => $result));
		}
	}

	private function fetchProjectComments(){
		$jsonResult = array();

		$comments = ProjectComment::model()->byProject($_GET['project_id'])->with('author')->findAll();
		foreach($comments as $id => $record){
			$jsonResult[$id] = $record->getAttributes();
			$author = $record->getRelated('author');
			$jsonResult[$id]['author'] = $author->firstname.' '.$author->lastname;
		}

		return $jsonResult;
	}

	private function fetchUserStoryComments(){
		$jsonResult = array();

		$comments = UserStoryComment::model()->byUserstory($_GET['userstory_id'])->with('author')->findAll();
		foreach($comments as $id => $record){
			$jsonResult[$id] = $record->getAttributes();
			$author = $record->getRelated('author');
			$jsonResult[$id]['author'] = $author->firstname.' '.$author->lastname;
		}

		return $jsonResult;
	}
}