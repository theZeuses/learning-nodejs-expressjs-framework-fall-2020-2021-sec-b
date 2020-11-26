const express 	= require('express');
const multer = require('multer');
const { body, check, validationResult } = require('express-validator');
const loginModel = require('../models/loginModel');
const booksModel	= require.main.require('./models/booksModel');
const usersModel	= require.main.require('./models/usersModel');
const router 	= express.Router();

const storage = multer.diskStorage({
	//destination for files
	destination: function (request, file, callback) {
	  callback(null, './public/assets/uploads/');
	},
  
	//add back the extension
	filename: function (request, file, callback) {
	  callback(null, Date.now() + file.originalname);
	},
  });
  
  //upload parameters for multer
  const upload = multer({
	storage: storage,
	limits: {
	  fieldSize: 1024 * 1024 * 3,
	},
  });

router.get('/', (req, res)=>{
    if(req.cookies['uname'] != null && req.session.type=="Customer"){
		res.redirect('customer/home');
	}else{
		res.redirect('/login');
	}
})

router.get('/cart', (req, res)=>{
	res.render('customer/cart');
})

router.get('/home', (req, res)=>{
	booksModel.getAllAvailable(function(results){
		var shuffled = results.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value);
		var novel = results.filter(function(result){
			return result.category == "Novel";
		});
		var literature = results.filter(function(result){
			return result.category == "Literature";
		});
		var scifi = results.filter(function(result){
			return result.category == "Sci-fi";
		});
		var academic = results.filter(function(result){
			return result.category == "Academic";
		});
		res.render('customer/home', {shuffled: shuffled, novel: novel, literature: literature, scifi: scifi, academic: academic, cartItemNumber: req.cookies['cartItemNumber']});
	});
	
})

router.get('/categorify/:data', (req, res)=>{
	var data = JSON.parse(req.params.data);
	booksModel.getByCategory(data.query, function(results){
		res.json({results: results});
	});
})

router.get('/addtocart/:data', (req, res)=>{
	var data = JSON.parse(req.params.data);
	var arr = req.cookies['cartItem'];
	arr.push(data.query);
	var num = parseInt(req.cookies['cartItemNumber']);
	num += 1;
	res.cookie('cartItem', arr);
	res.cookie('cartItemNumber', num);
	console.log(req.cookies['cartItem'], req.cookies['cartItemNumber']);
	res.json({num: num});
})

router.get('/profile', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Customer"){
		usersModel.getById(req.cookies['uname'], function(result){
			res.render('customer/profile', {user: result[0], cartItemNumber: req.cookies['cartItemNumber']});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/profile', upload.single('image'), [
	check('FullName')
	.notEmpty()
	.withMessage('Full name must be provide'),
	check('email')
	.notEmpty()
	.withMessage('Email must be provided')
	.trim()
	.isEmail()
	.withMessage('Invalid Email'),
	check('Password')
	.notEmpty()
	.withMessage('Password must be provided'),
	check('PasswordConfirm')
	.custom((value, { req }) => {
		if(req.body.NewPassword.length != 0){
			if (value !== req.body.NewPassword) {
				throw new Error('New password confirmation is incorrect');
			  }else{
				  return true;
			  }
		}else{
			return true;
		}
	}),
	check('MobileNo')
	.notEmpty()
	.withMessage('Mobile Number must be provided')
	.isLength({min: 11, max: 11})
	.withMessage('Mobile number must be 11 digit')
],(req, res)=>{
	var user = {
		fullname : req.body.FullName,
		email : req.body.email,
		password : req.body.NewPassword,
		bio : req.body.bio,
		mobileno : req.body.MobileNo
	};
	const errors = validationResult(req);
	if(errors.isEmpty()){
		loginModel.getPass(req.cookies['uname'], function(result, status){
			if(req.body.Password == result[0].password){
				usersModel.getById(req.cookies['uname'], function(usr){
					if(req.file != null){
						usr[0].picture = req.file.filename;
					}
					usr[0].fullname = user.fullname;
					usr[0].mobileno = user.mobileno;
					usr[0].email = user.email;
					if(user.password.length != 0){
						result[0].password =  user.password;
					}
					if(user.bio.length != 0){
						usr[0].bio = user.bio;
					}
					usr[0].username = usr[0].userid;
					usersModel.update(usr[0], function(status){
						result[0].username = result[0].userid;
						loginModel.updatePass(result[0], function(status){
							usersModel.getById(req.cookies['uname'], function(user){
								var alertOne = "Profile updated successfully.";
								res.render('customer/profile', {user: user[0], alertOne: alertOne, cartItemNumber: req.cookies['cartItemNumber']});
							});
						});
					});
				});
			}else{
				var alertTwo = "Incorrect Password";
				res.render('customer/profile', {user: user, alertTwo: alertTwo, cartItemNumber: req.cookies['cartItemNumber']});
			}
		});
		
	}else{
		const alert = errors.array();
		res.render('customer/profile', {user: user, alert: alert, cartItemNumber: req.cookies['cartItemNumber']});
	}
})

module.exports = router;