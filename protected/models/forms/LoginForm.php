<?php

/**
 * LoginForm class.
 * LoginForm is the data structure for keeping
 * user login form data. It is used by the 'login' action of 'SiteController'.
 */
class LoginForm extends CFormModel
{
	public $identity;
	public $email;
	public $password;
	public $rememberMe;

	public function rules()
	{
		return array(
			// username and password are required
			array('email, password', 'required'),
			// rememberMe needs to be a boolean
			array('rememberMe', 'boolean'),
			array('password', 'authenticate')
		);
	}
	
	public function authenticate($attribute,$params)
	{
		$this->identity=new UserIdentity($this->email,$this->password);
		if(!$this->identity->authenticate()){
			$this->addError('password',$this->identity->errorMessage);
		}
	}
}
