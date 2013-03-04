<?php
class NotAjaxRequestException extends HttpException {
	protected function composeMessage(){
		return 'Request is not ajax-based in '.$this->context.".";
	}
	
	protected function defineCode(){
		return ExceptionCodes::NOT_AJAX_REQUEST;
	}
	
	protected function defineType(){
		return 'NOT_AJAX_REQUEST';
	}
}