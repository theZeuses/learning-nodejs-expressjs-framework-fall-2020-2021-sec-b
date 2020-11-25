const express 	= require('express');
const multer = require('multer');
const { body, check, validationResult } = require('express-validator');
const booksModel	= require.main.require('./models/booksModel');
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
    if(req.cookies['uname'] != null && req.session.type=="Admin"){
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
			res.render('admin/home', {shuffled: shuffled, novel: novel, literature: literature, scifi: scifi, academic: academic, cartItemNumber: req.cookies['cartItemNumber']});
		});
	}else{
		res.redirect('/login');
	}
})

router.get('/book/add', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Admin"){
		res.render('books/add');
	}else{
		res.redirect('/login');
	}
})

router.post('/book/add', upload.single('image'), [
	check('BookName', 'Book name must be provided')
	.notEmpty(),
	check('Author','Author name must be provided')
	.notEmpty(),
	check('Price')
	.notEmpty()
	.withMessage('Price of one unit must be provided')
	.isFloat({min: 0})
	.withMessage('Invalid price'),
	check('Quantity')
	.notEmpty()
	.withMessage('Quantity to input must be provided')
	.isFloat({min: 0})
	.withMessage('Invalid quantity'),
	check('Categories')
	.custom((value, { req }) => {
		if (value == "Novel" || value == "Literature" || value == "Sci-fi" || value == "Academic") {
			return true;
		}else{			
			throw new Error('Select a valid category');
		}
	}),
	check('Details', 'Provide some details about the book')
	.notEmpty()
], (req, res)=>{
	var book = {
		name : req.body.BookName,
		author : req.body.Author,
		price : req.body.Price,
		quantity : req.body.Quantity,
		category : req.body.Categories,
		details : req.body.Details
	};
	const errors = validationResult(req);
	if(errors.isEmpty()){
		if(req.file == null){
			var alertTwo = "Please upload a cover photo for the book";
			res.render('books/add', {alertTwo: alertTwo});
		}else{
			book.picture = req.file.filename;
			booksModel.insert(book, function(status){
				var alertOne = "Added book with name: "+book.name+", price: "+book.price+" , and quantity: "+book.quantity+" successfully.";
				res.render('books/add', {alertOne: alertOne});
			});
		}		
	}else{
		const alert = errors.array();
		res.render('books/add', {alert: alert, book: book});
	}
})

router.get('/book/manage', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Admin"){
		booksModel.getAll(function(results){
			res.render('books/manage', {books: results});
		});
	}else{
		res.redirect('/login');
	}	
})

router.get('/book/update/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Admin"){
		booksModel.getById(req.params.id, function(result){
			res.render('books/update', {book: result[0]});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/book/update/:id', upload.single('image'), [
	check('BookName', 'Book name must be provided')
	.notEmpty(),
	check('Author','Author name must be provided')
	.notEmpty(),
	check('Price')
	.notEmpty()
	.withMessage('Price of one unit must be provided')
	.isFloat({min: 0})
	.withMessage('Invalid price'),
	check('Quantity')
	.notEmpty()
	.withMessage('Quantity to input must be provided')
	.isFloat({min: 0})
	.withMessage('Invalid quantity'),
	check('Categories')
	.custom((value, { req }) => {
		if (value == "Novel" || value == "Literature" || value == "Sci-fi" || value == "Academic") {
			return true;
		}else{			
			throw new Error('Select a valid category');
		}
	}),
	check('Details', 'Provide some details about the book')
	.notEmpty()
], (req, res)=>{
	var book = {
		bookid : req.params.id,
		name : req.body.BookName,
		author : req.body.Author,
		price : req.body.Price,
		quantity : req.body.Quantity,
		category : req.body.Categories,
		details : req.body.Details
	};
	const errors = validationResult(req);
	if(errors.isEmpty()){
		booksModel.getById(req.params.id, function(result){
			if(req.file == null && (result[0].picture == null || result[0].picture.length == 0)){
				var alertTwo = "Please upload a cover photo for the book";
				res.render('books/update', {book: book, alertTwo: alertTwo});
			}else if(req.file != null){
				book.picture = req.file.filename;
				booksModel.update(book, function(status){
					var alertOne = "Updated book successfully.";
					res.render('books/update', {book: book, alertOne: alertOne});
				});
			}else{
				book.picture = result[0].picture;
				booksModel.update(book, function(status){
					var alertOne = "Updated book successfully.";
					res.render('books/update', {book: book, alertOne: alertOne});
				});
			}
		});		
	}else{
		const alert = errors.array();
		res.render('books/update', {alert: alert, book: book});
	}
})

router.get('/users/list', (req, res)=>{
	res.render('users/list');
})

router.get('/profile', (req, res)=>{
	res.render('admin/profile');
})

module.exports = router;