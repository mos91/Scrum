<?php

class ProjectController extends Controller {
	public function actions(){
		return array(
				'create' => 'application.controllers.project.CreateProductAction',
				'change' => 'application.controllers.project.ChangeActiveProductAction',
				'delete' => 'application.controllers.project.DeleteProductAction'
		);
	}
}