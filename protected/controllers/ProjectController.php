<?php

class ProjectController extends Controller {
	public function actions(){
		return array(
				'index' => 'application.controllers.project.GetProjectAction',
				'get' => 'application.controllers.project.GetProjectAction',

				'create' => 'application.controllers.project.CreateProjectAction',
				'comment' => 'application.controllers.project.CommentProjectAction',
				'change' => 'application.controllers.project.ChangeActiveProjectAction',
				'update' => 'application.controllers.project.UpdateProjectAction',
				'drop' => 'application.controllers.project.DropProjectAction',
				'restore' => 'application.controllers.project.RestoreProjectAction',
				'delete' => 'application.controllers.project.DeleteProjectAction',
				'grant' => 'application.controllers.project.GrantProjectAction',
				'revoke' => 'application.controllers.project.RevokeProjectAction'
		);
	}
}