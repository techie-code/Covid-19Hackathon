var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
	res.render('home.ejs');
});
router.get('/analytics', function (req, res, next) {
	res.render('covid-analytics.ejs');
});
router.get('/covidtest', function (req, res, next) {
	res.render('covidtest.ejs');
});
router.get('/findnearhospital', function (req, res, next) {
	res.render('hospital.ejs');
});
router.get('/vaccination', function (req, res, next) {
	 res.render('vaccine.ejs');
});


router.get('/register', function (req, res, next) {
	return res.render('index.ejs');
});


router.post('/register', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.dob || !personInfo.gender || !personInfo.country || !personInfo.state || !personInfo.city || !personInfo.address || !personInfo.mobile || !personInfo.nationalid || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf,
							dob:personInfo.dob,
							gender:personInfo.gender,
							country:personInfo.country,
							state:personInfo.state,
							city:personInfo.city,
							address:personInfo.address,
							mobile:personInfo.mobile,
							nationalid:personInfo.nationalid
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are registered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not registered!"});
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("profile");
		console.log(data);

		return res.render('profile.ejs', {"name":data.username,"email":data.email,"dob":data.dob,"gender":data.gender,"country":data.country,"state":data.state,"city":data.city,"address":data.address,"mobile":data.mobile,"nationalid":data.nationalid});
		
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {

    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {

	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not registered!"});
		}else{

			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

router.get('/dashboard', function (req, res, next) {
	console.log("dashboard");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("dashboard");
		console.log(data);
		if(!data){
			res.redirect('/register');
		}else{

			return res.render('dashboard.ejs', {"name":data.username,"email":data.email});
		}
	});
});

module.exports = router;