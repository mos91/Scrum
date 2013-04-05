<?php
class UserstoriesController extends Controller {
	public function actions(){
		return array(
			'index' => 'application.controllers.userstories.GetUserStoryAction',
			'get' => 'application.controllers.userstories.GetUserStoryAction',
			'create' => 'application.controllers.userstories.CreateUserStoryAction',
			'drop' => 'application.controllers.userstories.DropUserStoryAction',
			'delete' => 'application.controllers.userstories.DeleteIssueAction'
		);
	}
}