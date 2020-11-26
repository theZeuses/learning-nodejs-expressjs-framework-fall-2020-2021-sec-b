const express 	= require('express');
const booksModel	= require.main.require('./models/booksModel');
const usersModel	= require.main.require('./models/usersModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
    if(req.cookies['uname'] != null && req.session.type=="Customer"){
		res.redirect('customer/home');
	}else{
		res.render('login/login');
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

module.exports = router;