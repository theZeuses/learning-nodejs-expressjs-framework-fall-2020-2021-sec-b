const express 	= require('express');
const { body, check, validationResult } = require('express-validator');
const usersModel = require.main.require('./models/usersModel');
const loginModel = require.main.require('./models/loginModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('register/register');
})

router.post('/',[
	check('FullName')
	.notEmpty()
	.withMessage('Full name must be provide'),
	check('email')
	.notEmpty()
	.withMessage('Email must be provided')
	.trim()
	.isEmail()
	.withMessage('Invalid Email'),
	check('UserName')
	.notEmpty()
	.withMessage('User name must be provided'),
	check('Password')
	.notEmpty()
	.withMessage('Password must be provided'),
	check('PasswordConfirm')
	.notEmpty()
	.withMessage('Retype Password')
	.custom((value, { req }) => {
		if (value !== req.body.Password) {
		  throw new Error('Password confirmation is incorrect');
		}else{
			return true;
		}
	}),
	check('MobileNo')
	.notEmpty()
	.withMessage('Mobile Number must be provided')
	.isLength({min: 11, max: 11})
	.withMessage('Mobile number must be 11 digit'),
	check('UserType')
	.custom((value, { req }) => {
		if (value == "Admin" || value == "Customer") {
			return true;
		}else{			
			throw new Error('Select a valid user type');
		}
	})
],(req, res)=>{
	var user = {
		username : req.body.UserName,
		fullname : req.body.FullName,
		email : req.body.email,
		password : req.body.Password,
		type : req.body.UserType,
		bio : req.body.bio,
		mobileno : req.body.MobileNo
	};
	const errors = validationResult(req);
	if(errors.isEmpty()){
		usersModel.findOne(user.username,function(status){
			if(status){
				var alertTwo = "username already taken";
				res.render('register/register', {user: user, alertTwo: alertTwo});
			}else{
				usersModel.insert(user, function(status){
					loginModel.insert(user, function(status){
						var alertOne = "Registration Successful. You can log in now.";
						res.render('register/register', {user: user, alertOne: alertOne});
					});
				});
			}
		});
		
	}else{
		const alert = errors.array();
		res.render('register/register', {user: user, alert: alert});
	}
})

module.exports = router;