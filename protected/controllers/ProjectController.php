<?php

class ProjectController extends Controller {
	public function actions(){
		return array(
				'create' => 'application.controllers.project.CreateProductAction',
				'delete' => 'application.controllers.project.DeleteProductAction'
		);
	}
}