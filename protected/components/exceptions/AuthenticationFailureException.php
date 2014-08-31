<?php

class AuthenticationFailureException extends HttpException {
	public function composeMessage(){
		return 'Authentication error';
	}

	public function composeSpecificMessage(){
		$errors = $this->specific;
		$html = '<ul>';
		foreach($errors as $fieldName => $errorDescriptions){
			$html .= '<p>'.$fieldName.'</p><ul>';
			foreach($errorDescriptions as $errorDescription){
				$html .= '<li>'.$errorDescription.'</li>';
			}
			$html .= '</ul>';

			return $html;
		}
	}

	public function defineCode(){
		return ExceptionCodes::AUTHENTICATION_FAILURE;
	}
}