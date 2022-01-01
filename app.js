var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'ubgnft',
	connectionLimit: 10
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./admin/download")));
app.set('views', path.join(__dirname, './admin'));

// Setting the view engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get('/', function(request, response) {
	if (request.session.loggedin != true) {
		response.redirect("/login");
	}else{
		response.redirect("/home");
	}
});
app.get('/login', function(request, response) {
	if (request.session.loggedin) {
		response.redirect("/home");
	}
	response.render('login');
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.render('login',{error : "Login Error"});
			}			
			response.end();
		});
	} else {
		response.render('login',{error : "Login Error"});
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.render('home');
	} else {
		response.redirect("/login");
	}
	response.end();
});

/*Ads Options*/
app.get('/ads', function(request, response) {
	if (request.session.loggedin) {
		response.render('ads');
	} else {
		response.redirect("/login");
	}
	response.end();
});
app.get('/ads/edit/:id', function(request, response) {
	if (request.session.loggedin) {
		response.render('ads-manager');
	} else {
		response.redirect("/login");
	}
	response.end();
});

app.get('/ads/create', function(request, response) {
	if (request.session.loggedin) {
		response.render('ads-manager');
	} else {
		response.redirect("/login");
	}
	response.end();
});

app.get('/ads/delete/:id', function(request, response) {
	if (request.session.loggedin) {
		response.redirect("/ads");
	} else {
		response.redirect("/login");
	}
	response.end();
});


app.get('/plancemarket', function(request, response) {
	if (request.session.loggedin) {
		response.render('plancemarket');
	} else {
		response.redirect("/login");
	}
	response.end();
});


app.get('/nftmarket', function(request, response) {
	if (request.session.loggedin) {
		response.render('nftmarket');
	} else {
		response.redirect("/login");
	}
	response.end();
});

app.get('/booking', function(request, response) {
	if (request.session.loggedin) {
		response.render('booking');
	} else {
		response.redirect("/login");
	}
	response.end();
});

app.listen(3000);