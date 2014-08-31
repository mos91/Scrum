<?php

class SprintsController extends Controller {
	public function actions(){
		return array(
				'index' => 'application.controllers.sprints.GetSprintAction',
				'get' => 'application.controllers.sprints.GetSprintAction',
				'create' => 'application.controllers.sprints.CreateSprintAction',
				'drop' => 'application.controllers.sprints.DropSprintAction',
				'update' => 'application.controllers.sprints.UpdateSprintAction',
				'changeStatus' => 'application.controllers.sprints.ChangeSprintStatusAction',
				'burndown' => 'application.controllers.sprints.BurndownStatisticAction'
				//'drop' => 'application.controllers.project.DropProjectAction',
				//'restore' => 'application.controllers.project.RestoreProjectAction',
				//'delete' => 'application.controllers.project.DeleteProjectAction'
		);
	}
}