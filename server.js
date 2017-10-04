
var express = require('express');
var app = express();
var http = require('http');
var fs = require("fs");

var MedicoinfraSqlClient = require("./database/dbManager.js");
var dbm = new MedicoinfraSqlClient(); 

var ClientInventory = require("./ClientInventory/ClientInventory.js");
var ClientRegistration = require('./ClientRegestration/ClientRegestration');
dbm.connect(function (err){
	if(!err){
		console.log("Successfully Connected with Database!!!!!!");
	}else{
		console.log("Fail to Connect Database!!!!!!");
	}
});

var ForgotPassword = require("./Mailer/ForgotPassword.js");
var fPassword = new ForgotPassword(); 

var CReg = new ClientRegistration(dbm);
var cInventory = new ClientInventory(dbm);

app.use(express.static('public'));

var userType = "user3";

// Authenticator
app.use(express.basicAuth(function(user, pass, callback) {
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
	//console.log( data );
		var users = JSON.parse( data );
		var userdata = users[userType];
		var result = (user === userdata.username && pass === userdata.password);
		callback(null /* error */, result);
	});
}));

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Welcome to MedicoInfra WebService.');
});

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
});

app.get('/getWebServiceURL', function (req, res) {
	fs.readFile( __dirname + "/" + "WebServiceURL.json", 'utf8', function (err, data) {
		//console.log( data );
		var dataString = JSON.parse( data );
		var WebServicedata = dataString.WebService;
		   // Prepare output in JSON format
		   var response = {
			   WebService : {
					TestURL:WebServicedata.TestURL,
					ProductionURL:WebServicedata.ProductionURL,
					UserName:WebServicedata.username,
					Password:WebServicedata.password
			   }
		   };
		   console.log(response);
		   res.end(JSON.stringify(response));
	});
});

app.get('/sendForgotPassword', function (req, res) {
	fPassword.ForgotPassword(req, res);
});

app.get('/requestxml.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "requestxml.htm" );
});

app.get('/UpdateClientRecord', function (req, res) {
	var xmlData = req.headers.getrequestedquery;
	console.log(req.headers);
	console.log(xmlData);
	res.writeHead(200, {"RequestType":"ClientInventory",	"ClientInventoryQuery":xmlData});
	switch(xmlData) {
		case 'UpdateInventoryRecords':
			cInventory.UpdateInventoryRecords(req, res);
			break;
		case 'getProductCount':
			cInventory.getProductCount(req, res);
			break;
		case 'getProductList':
			cInventory.getProductList(req, res);
			break;
	}
});

app.get('/getClientRegistrationQuery', function (req, res) {
	var xmlData = req.headers.getrequestedquery;
	console.log(req.headers);
	console.log("Requested Query : " + xmlData);
	res.writeHead(200, {"RequestType":"ClientRegistration",	"ClientRegistrationQuery":xmlData});
	switch(xmlData) {
		case 'InsertNewClientRecord':
			CReg.InsertNewClientRecord(req, res);
			break;
		case 'UpdateClientRecord':
			CReg.UpdateClientRecord(req, res);
			break;
		case 'UpdateRegistrationValidation':
			CReg.UpdateRegistrationValidation(req, res);
			break;
		case 'getRegisteredClientId':
			CReg.getRegisteredClientId(req, res);
			break;
		case 'getRegistrationCount':
			CReg.getRegistrationCount(req, res);
			break;
		case 'getRegistrationInfo':
			CReg.getRegistrationInfo(req, res);
			break;
		case 'getRegistrationCity':
			CReg.getRegistrationCity(req, res);
			break;
		case 'getRegistrationLocation':
			CReg.getRegistrationLocation(req, res);
			break;
		case 'sendRegistrationInfoMail':
			CReg.sendRegistrationInfoMail(req, res);
			break;
		default:
			res.send('Requested Query (' + xmlData + '): NOTFOUND.');
			break;
	}
});

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

http.createServer(app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});
