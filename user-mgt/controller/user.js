const express = require('express');
const router = express.Router();

router.get('/create', (req, res)=>{
	res.render('user/create'); 
})

router.get('/delete/:id', (req, res)=>{

	var id = req.params.id;
	var users = req.cookies['users'];

	var index;
	
	for(var i = 0; i < users.length; i++){
		if( users[i][0] == id ){
			index = i;
			break;
		}
	}

	users.splice(index,1);
	res.cookie('users', users);
	res.redirect('/home/userlist');
})


router.post('/create', (req, res)=>{

	if(req.body.id.length != 0 && req.body.name.length  != 0 && req.body.dept.length  != 0 && req.body.cgpa.length  != 0){
		var users = req.cookies['users'];
		var user = [req.body.id , req.body.name , req.body.dept , req.body.cgpa ];
		users.push(user);
		res.cookie('users', users);
	}
	res.redirect('/home/userlist'); 	
})


router.get('/edit/:id', (req, res)=>{

	var id = req.params.id;
	var users = req.cookies['users'];

	var index;
	
	for(var i = 0; i < users.length; i++){
		if( users[i][0] == id ){
			index = i;
			break;
		}
	}

	var user = users[index];

	res.render('user/edit', {user: user});
})

router.post('/edit/:id', (req, res)=>{
	if(req.body.id.length != 0 && req.body.name.length  != 0 && req.body.dept.length  != 0 && req.body.cgpa.length  != 0){
		var users = req.cookies['users'];
		var user = [req.body.id , req.body.name , req.body.dept , req.body.cgpa ];
		var index;
	
		for(var i = 0; i < users.length; i++){
			if( users[i][0] == req.body.id) {
				index = i;
				break;
			}
		}
		users.splice(index,1,user);
		res.cookie('users', users);
		res.redirect('/home/userlist');
	}
	res.redirect('/home/userlist');
})


module.exports = router;