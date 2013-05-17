<?php

class SprintsController extends Controller {
	public function actions(){
		return array(
				'index' => 'application.controllers.sprints.GetSprintAction',
				'get' => 'application.controllers.sprints.GetSprintAction',
				'create' => 'application.controllers.sprints.CreateSprintAction',
				'update' => 'application.controllers.sprints.UpdateSprintAction'
				//'drop' => 'application.controllers.project.DropProjectAction',
				//'restore' => 'application.controllers.project.RestoreProjectAction',
				//'delete' => 'application.controllers.project.DeleteProjectAction'
		);
	}
}