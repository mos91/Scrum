<?php
interface IssueStatusCodes {
	const OPEN = 0x0000;
	const TODO = 0x0001;
	const IN_PROGRESS = 0x0002;
	const TO_TEST = 0x0003;
	const DONE = 0x0004;
}