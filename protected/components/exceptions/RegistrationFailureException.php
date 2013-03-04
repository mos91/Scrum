<?php
class RegistrationFailureException extends HttpException {
	protected function composeMessage(){
		return 'Registration failure in '.$this->context.".".$this->composeSpecificMessage();
	}
	
	protected function composeSpecificMessage(){
		return $this->specific;	
	}
	
	protected function defineCode(){
		return ExceptionCodes::REGISTRATION_FAILURE;
	}
	
	protected function defineType(){
		return 'REGISTRATION_FAILURE';
	}
}