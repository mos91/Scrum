<?php
class NotAjaxRequestException extends CHttpException {
	public function composeMessage(){
		return 'Request is not ajax-based in '.$this->context.".".$this->specificMessage;
	}
	
	public function defineCode(){
		return ExceptionCodes::AUTHENTICATION_FAILURE;
	}
}