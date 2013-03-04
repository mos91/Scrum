<?php

class AuthenticationFailureException extends HttpException {
	protected function composeMessage(){
		return 'Authentication failure in '.$this->context.".";
	}
	
	protected function defineCode(){
		return ExceptionCodes::AUTHENTIFICATION_FAILURE;
	}
	
	protected function defineType(){
		return 'AUTHENTIFICATION_FAILURE';
	}
}