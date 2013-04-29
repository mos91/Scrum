<?php
class UserstoriesController extends Controller {
	public function actions(){
		return array(
			'index' => 'application.controllers.userstories.GetUserStoryAction',
			'get' => 'application.controllers.userstories.GetUserStoryAction',

			'create' => 'application.controllers.userstories.CreateUserStoryAction',
			'update' => 'application.controllers.userstories.UpdateUserStoryAction',
			//new -> trashed, completed -> trashed
			'drop' => 'application.controllers.userstories.DropUserStoryAction',
			//trashed -> new, trashed -> completed 
			'restore' => 'application.controllers.userstories.RestoreUserStoryAction',
			'delete' => 'application.controllers.userstories.DeleteIssueAction',

			//new -> accessed
			'access' => 'application.controllers.userstories.AccessUserStoryAction',
			//accessed -> new
			'deny' => 'application.controllers.userstories.DenyUserStoryAction',
			//accessed -> assigned
			'assign' => 'application.controllers.userstories.AssignUserStoryAction',
			//accessed -> todo, assign -> todo
			'start' => 'application.controllers.userstories.StartUserStoryAction',
			//todo -> to test
			'test' => 'application.controllers.userstories.TestUserStoryAction',
			//todo -> done
			'finish' => 'application.controllers.userstories.FinishUserStoryAction',
			//totest -> todo
			'failureTest' => 'application.controllers.userstories.FailureTestUserStoryAction',
			//totest -> done
			'successTest' => 'application.controllers.userstories.SuccessTestUserStoryAction',
			//done -> todo
			'renew' => 'application.controllers.userstories.RenewUserStoryAction',
			//done -> completed
			'close' => 'application.controllers.userstories.CloseUserStoryAction'
		);
	}
}