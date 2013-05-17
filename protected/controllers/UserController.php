<?php

class UserController extends Controller
{
	public function actions(){
		'index' => 'application.controllers.user.GetUsersAction',
		'get' => 'application.controllers.user.GetUsersAction'
	}
}