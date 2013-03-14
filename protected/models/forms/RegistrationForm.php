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
				array('firstname,lastname,email,password,passwordConfirm','required'),
				array('password', 'compare', 'compareAttribute' => 'passwordConfirm')
		);
	}
}