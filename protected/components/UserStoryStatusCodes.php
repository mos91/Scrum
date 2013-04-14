<?php
interface UserStoryStatusCodes {
	
	const NEW = 0x0000;
	
	const ACCEPTED = 0x0001;
	
	const ASSIGNED_TO_SPRINT = 0x0003;
	
	const TODO = 0x0004;
	
	const TO_TEST = 0x0006;
	
	const DONE = 0x0007;

	const SPRINT_COMPLETED = 0x0008;
}