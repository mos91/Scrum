<?php

class CommentsController extends Controller {
	public function actions(){
		return array(
				'index' => 'application.controllers.comments.GetCommentsAction',
				'get' => 'application.controllers.comments.GetCommentsAction',
				'create' => 'application.controllers.comments.CreateCommentAction'
		);
	}
}