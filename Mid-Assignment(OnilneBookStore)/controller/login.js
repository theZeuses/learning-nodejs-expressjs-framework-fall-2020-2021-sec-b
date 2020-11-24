const express 	= require('express');
const loginModel	= require.main.require('./models/loginModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
    if(req.cookies['uname'] != null && req.session.type=="Admin"){
		res.redirect('/admin');
	}else if(req.cookies['uname'] != null && req.session.type=="Customer"){
		res.redirect('/customer');
	}else{
		res.render('login/login');
	}
})

router.post('/', (req, res)=>{
    var user = {
		username: req.body.username,
		password: req.body.password
    };
    
    loginModel.validate(user, function(result, status){
        if(status){
            if(result[0].type == "Admin"){
                res.cookie('uname', result[0].userid);
                req.session.type = result[0].type;
                res.redirect('/admin');
            }else{
                res.cookie('uname', result[0].userid);
                req.session.type = result[0].type;
                res.redirect('/customer');
            }
        }else{
            var alertTwo = "Invalid Credentials";
            res.render('login/login', {alertTwo: alertTwo});
        }
    });
})

module.exports = router;