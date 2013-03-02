<?php
class InvalidRestParamsException extends CHttpException {
	public function composeMessage(){
		return 'Registration failure in '.$this->context.".".$this->specificMessage;
	}
	
	public function defineCode(){
		return ExceptionCodes::REGISTRATION_FAILURE;
	}
}