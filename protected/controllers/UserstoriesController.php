<?php
class UserstoriesController extends Controller {
	public function actions(){
		return array(
			'index' => 'application.controllers.userstories.GetUserStoryAction',
			'get' => 'application.controllers.userstories.GetUserStoryAction',
			'changeStatus' => 'application.controllers.userstories.ChangeUserStoryStatus',
			'changeSprint' => 'application.controllers.userstories.ChangeSprint',
			'create' => 'application.controllers.userstories.CreateUserStoryAction',
			'update' => 'application.controllers.userstories.UpdateUserStoryAction',
			'drop' => 'application.controllers.userstories.DropUserStoryAction',
			'delete' => 'application.controllers.userstories.DeleteIssueAction'
		);
	}
}