<?php

class ProjectController extends Controller {
	public function actions(){
		return array(
				'index' => 'application.controllers.project.GetProjectAction',
				'get' => 'application.controllers.project.GetProjectAction',
				'create' => 'application.controllers.project.CreateProjectAction',
				'change' => 'application.controllers.project.ChangeActiveProjectAction',
				'update' => 'application.controllers.project.UpdateProjectAction',
				'drop' => 'application.controllers.project.DropProjectAction',
				'delete' => 'application.controllers.project.DeleteProjectAction'
		);
	}
}