const express = require('express');
const mysql 	= require('mysql');
const router = express.Router();

router.get('/create', (req, res)=>{
	res.render('user/create'); 
})


router.post('/create', (req, res)=>{

	if(req.body.id.length != 0 && req.body.username.length  != 0 && req.body.password.length  != 0 && req.body.type.length  != 0){
		
		var connection = mysql.createConnection({
			host     : '127.0.0.1',
			user     : 'root',
			password : '',
			database : 'node1'
		});
		   
		connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}	 
		console.log('connected as id ' + connection.threadId);
		});
	
		var sql = "insert into users values( '"+req.body.id +"','"+req.body.username+"','"+req.body.password +"','"+req.body.type+"')";
		connection.query(sql, function (error, results) { 
			if(error == null){
				var sql1 = "select * from users ";
				connection.query(sql1, function (error1, results1) { 
					res.render('home/userlist', {userlist: results1});
					console.log(results1);
				});
			
			}else{
				console.log('Invalid Id');
			}
			connection.end(function(err) {
				console.log('connection closed!');	  
			});
		});
	
	}else{
		res.redirect('/home/userlist'); 
	}
	
})


router.get('/edit/:id', (req, res)=>{

	var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'node1'
	  });
	   
	  connection.connect(function(err) {
		if (err) {
		  console.error('error connecting: ' + err.stack);
		  return;
		}	 
		console.log('connected as id ' + connection.threadId);
	  });
  
	  var sql = "select * from users where id="+req.params.id;
	  connection.query(sql, function (error, results) { 
		  res.render('user/edit', {user: results});
	  });
  
	  connection.end(function(err) {
		  console.log('connection closed!');	  
	  });
})


router.post('/edit/:id', (req, res)=>{

	if(req.body.id.length != 0 && req.body.username.length  != 0 && req.body.password.length  != 0 && req.body.type.length  != 0){
		
		var connection = mysql.createConnection({
			host     : '127.0.0.1',
			user     : 'root',
			password : '',
			database : 'node1'
		});
		   
		connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}	 
		console.log('connected as id ' + connection.threadId);
		});
	
		var sql = "update users set username='"+req.body.username+"', password='"+req.body.password +"', type='"+req.body.type+"' where id='"+req.body.id +"'";
		connection.query(sql, function (error, results) { 
			if(error == null){
				var sql = "select * from users ";
				connection.query(sql, function (error, results) { 
					res.render('home/userlist', {userlist: results});
				});
			
			}else{
				console.log('Invalid Id');
			}
			connection.end(function(err) {
				console.log('connection closed!');	  
			});
		});
	
	}else{
		res.redirect('/home/userlist'); 
	}
})

router.get('/delete/:id', (req, res)=>{
	var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'node1'
	  });
	   
	  connection.connect(function(err) {
		if (err) {
		  console.error('error connecting: ' + err.stack);
		  return;
		}	 
		console.log('connected as id ' + connection.threadId);
	  });
  
	  var sql = "select * from users where id="+req.params.id;
	  connection.query(sql, function (error, results) { 
		  res.render('user/delete', {user: results});
	  });
  
	  connection.end(function(err) {
		  console.log('connection closed!');	  
	  });
})

router.post('/delete/:id', (req, res)=>{
	
	var connection = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'node1'
	});
	   
	connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}	 
	console.log('connected as id ' + connection.threadId);
	});

	var sql = "delete from users where id='"+req.params.id +"'";
	connection.query(sql, function (error, results) { 
		if(error == null){
			var sql = "select * from users ";
			connection.query(sql, function (error, results) { 
				res.render('home/userlist', {userlist: results});
			});
		
		}else{
			console.log('Invalid Id');
		}
		connection.end(function(err) {
			console.log('connection closed!');	  
		});
	});
})

module.exports = router;


//validation -> express-validator (https://www.npmjs.com/package/express-validator)
//file upload -> express-fileupload (https://www.npmjs.com/package/express-fileupload)
