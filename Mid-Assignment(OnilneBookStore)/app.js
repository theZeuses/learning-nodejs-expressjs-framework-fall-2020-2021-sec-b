//declaration
const express 		= require('express');
const bodyParser 	= require('body-parser');
const exSession 	= require('express-session');
const cookieParser 	= require('cookie-parser');
const login			= require('./controller/login');
const admin			= require('./controller/admin');
const logout		= require('./controller/logout');
const register		= require('./controller/register');
const customer		= require('./controller/customer');
const app 			= express();

//config
app.set('view engine', 'ejs');

//middleware
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false }));
app.use(cookieParser());

app.use('/login', login);
app.use('/admin', admin);
app.use('/customer', customer);
app.use('/logout', logout);
app.use('/register', register);

//route
app.get('/', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Admin"){
		res.redirect('/admin');
	}else if(req.cookies['uname'] != null && req.session.type=="Customer"){
		res.redirect('/customer');
	}else{
		res.redirect('/login');
	}
});

//server startup
app.listen(3000, (error)=>{
	console.log('express server started at 3000...');
});