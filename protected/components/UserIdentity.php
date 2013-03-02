<?php

class UserIdentity extends CUserIdentity
{
    private $email;
    
    public function authenticate()
    {
        $record=UserRecord::model()->findByAttributes(array('email'=>$this->id));
        
        if($record===null)
            $this->errorCode=self::ERROR_USERNAME_INVALID;
        else if($record->password!==crypt($this->password,$record->password))
            $this->errorCode=self::ERROR_PASSWORD_INVALID;
        else
        {
            $this->_id=$record->id;
            $this->setState('firstname', $record->firstname);
            $this->setState('lastname', $record->lastname);
            $this->errorCode=self::ERROR_NONE;
        }
        return !$this->errorCode;
    }
 
    public function getId()
    {
        return $this->email;
    }
}