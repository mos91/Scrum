<?php

class AuthenticationFailureException extends CHttpException {
	public function composeMessage(){
		return 'Authentication failure in '.$this->context.".".$this->specificMessage;
	}
	
	public function defineCode(){
		return ExceptionCodes::AUTHENTICATION_FAILURE;
	}
}