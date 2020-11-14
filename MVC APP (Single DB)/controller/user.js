const express = require('express');
const userModel	= require.main.require('./models/userModel');
const router = express.Router();

router.get('/create', (req, res)=>{
	res.render('user/create'); 
})

router.post('/create', (req, res)=>{

	var user = {
		username: 	req.body.username,
		password: 	req.body.password,
		type	: 	req.body.type
	};

	userModel.insert(user, function(status){
		if(status){
			res.redirect('/home/userlist');
		}else{
			res.render('user/create'); 
		}
	});
})


router.get('/edit/:id', (req, res)=>{

	userModel.getById(req.params.id, function(result){
		var user = {
			username: result[0].username,
			password: result[0].password,
			type	: result[0].type
		}
		res.render('user/edit', user);
	});
	
})


router.post('/edit/:id', (req, res)=>{

	var user = {
		id		: req.params.id,
		username: req.body.username,
		password: req.body.password,
		type	: req.body.type
	}
	if(user.username.length != 0 && user.password.length != 0 && user.type.length != 0){
		userModel.update(user, function(status){
			if(status){
				res.redirect('/home/userlist');			
			}else{
				res.redirect('/home/userlist');	//if functionality increase then may something new be added
			}
		});
	}else{
		res.redirect('/home/userlist');	//if functionality increase then may something new be added
	}
})

router.get('/delete/:id', (req, res)=>{
	
	userModel.getById(req.params.id, function(result){
		var user = {
			username: result[0].username,
			password: result[0].password,
			type	: result[0].type
		}
		res.render('user/delete', user);
	});
})

router.post('/delete/:id', (req, res)=>{
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home/userlist');			
		}else{
			res.redirect('/home/userlist');	//if functionality increase then may something new be added
		}
	});
})

module.exports = router;


//validation -> express-validator (https://www.npmjs.com/package/express-validator)
//file upload -> express-fileupload (https://www.npmjs.com/package/express-fileupload)
