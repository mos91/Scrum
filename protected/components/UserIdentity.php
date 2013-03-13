<?php

class UserIdentity extends CUserIdentity
{
	//основной ключ записи о пользователе
	private $_id;
	 
    public function authenticate()
    {
        $record=UserRecord::model()->find('email=:email', array(':email' => $this->id));
        
        if($record===null){
        	$this->errorCode=self::ERROR_USERNAME_INVALID;
        }
        else if($record->password!==crypt($this->password,$record->password)){	
        	$this->errorCode=self::ERROR_PASSWORD_INVALID;
        }
        else
        {
            $this->_id=$record->id;
            $record->session_key = $session_key = md5(Utility::blowfishSalt());
            $this->setState('session-key', $session_key);
            $this->setState('firstname', $record->firstname);
            $this->setState('lastname', $record->lastname);
            $this->setState('session_count', ++$record->session_count);
            $this->errorCode=self::ERROR_NONE;
            $record->save();
        }
        
        if ($this->errorCode === self::ERROR_USERNAME_INVALID ||
        		 $this->errorCode === self::ERROR_PASSWORD_INVALID){
        	$this->errorMessage = 'user with such email or password doesnt exist';
        }
        return !$this->errorCode;
    }
}