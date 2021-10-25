<?php

namespace app\models;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of mMessages
 *
 * @author User
 */
class JsonMessages
{

	const GENERALERROR = 'Error communicating with the server.';
	const ERRORINVALID = 'Invalid Data.';
	const ERROREMAILANDPASSWORD = 'Email and/or password is not correct.';
	const USERNOTACTIVE = "Your account is not active. Please activate your email and then login.";
	const EMAILTAKEN = "Email has already been taken.";
	const EMAILNOTEXISTS = "Email does not exist.";
	const INVALIDTOKEN = "Invalid Token.";
	const USERNOTFOUND = "User not found.";
	const ERRORSENDINGEMAIL = "Error sendig the email.";
	const ERRORNOTIMAGEEXTENSION = "Only images are allowed.";
	const ERRORNOTVIDEOEXTENSION = "Only videos are allowed.";
	const ERRORUPLOADINGIMG = "Error uploading image";
	const ERRORUPLOADINGVIDEO = "Error uploading video";
	const SUCCESS = "Success.";
}
