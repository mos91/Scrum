<?php
class IssueController extends Controller {
	public function actions(){
		return array(
			'create' => 'application.controllers.issue.CreateIssueAction',
			//drop помещает issue в корзину
			'drop' => 'application.controllers.issue.DropIssueAction',
			//назначить задачу кому-то
			'assign' => 'application.controllers.issue.AssignAction',
			//снять задачу с кого-то
			'revoke' => 'application.controllers.issue.RevokeAction',
			//delete удаляет issue навсегда
			'delete' => 'application.controllers.issue.DeleteIssueAction'
		);
	}
}