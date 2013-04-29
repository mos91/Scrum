<?php
interface UserStoryStatusCodes {
	
	const OPEN = 0x0000;
	
	const ACCEPTED = 0x0002;
	
	const ASSIGNED_TO_SPRINT = 0x0003;
	
	const TODO = 0x0005;
	
	const TO_TEST = 0x0007;
	
	const DONE = 0x0009;

	const COMPLETED = 0x0011;

	const IN_PROGRESS_MASK = 0x0001;

	const SPRINT_COMPLETED = 0x0012;
}