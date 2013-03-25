<?php
class RegistrationForm extends CFormModel {
	public $firstname;
	public $lastname;
	public $email;
	public $password;
	public $passwordConfirm;
	
	public function rules()
	{
		return array(
				// username and password are required
				array('email', 'notExist'),
				array('firstname,lastname,email,password,passwordConfirm','required'),
				array('password', 'compare', 'compareAttribute' => 'passwordConfirm')
		);
	}
	
	public function notExist($attribute, $params){
		if (UserRecord::model()->exists('email=:email', array(':email' => $this->email))){
			$this->addError('email', 'user with such email already exists');
		}
	}
}