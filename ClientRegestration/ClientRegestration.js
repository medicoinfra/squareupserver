/**
 * Define the ClientRegestration.
 */
var mysql     =    require('mysql');

var ClientRegestration = function(dbManager){
	
	var Mailer = require("../Mailer/Mailer.js");
	var RegistrationInfoMail = new Mailer(); 
	
	//  Scope.
    var self = this;	
	
    self.InsertNewClientRecord = function(req,res) {
		var CompanyName 	= req.query.CompanyName;
		var FirstName 		= req.query.FirstName;
		var LastName 		= req.query.LastName;
		var Email 		= req.query.Email;
		var VatTinNo 		= req.query.VatTinNo;
		var DrugLicNo 		= req.query.DrugLicNo;
		var TanNo 		= req.query.TanNo;
		var CSTNo 		= req.query.CSTNo;
		var PanNo 		= req.query.PanNo;
		var Address 		= req.query.Address;
		var City 		= req.query.City;
		var State 		= req.query.State;
		var Country 		= req.query.Country;
		var PostalCode 		= req.query.PostalCode;
		var TelephoneNo 	= req.query.TelephoneNo;
		var MobileNo 		= req.query.MobileNo;
		var GSTNo 		= req.query.GSTNo;
		var sqlQuery  		= 'CALL InsertNewClientRecord(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    	dbManager.RunQuery(sqlQuery, [CompanyName, FirstName, LastName, Email, VatTinNo, 
                          DrugLicNo, TanNo, CSTNo, PanNo, Address, City, State, Country, PostalCode, 
                          TelephoneNo, MobileNo, GSTNo], function(err, rows){
    		if(!err || rows[0].res !== 0) {
    			self.getRegistrationInfo(req,res);    	    	
            }else{  
                res.write(JSON.stringify("Request Failed."));
            	res.end();
            }
    	});
	};
	
	self.UpdateClientRecord = function(req,res) {
		var RegistrationID 	= req.query.RegistrationID;
		var CompanyName 	= req.query.CompanyName;
		var FirstName 		= req.query.FirstName;
		var LastName 		= req.query.LastName;
		var Email 		= req.query.Email;
		var VatTinNo 		= req.query.VatTinNo;
		var DrugLicNo 		= req.query.DrugLicNo;
		var TanNo 		= req.query.TanNo;
		var CSTNo 		= req.query.CSTNo;
		var PanNo 		= req.query.PanNo;
		var Address 		= req.query.Address;
		var City 		= req.query.City;
		var State 		= req.query.State;
		var Country 		= req.query.Country;
		var PostalCode 		= req.query.PostalCode;
		var TelephoneNo 	= req.query.TelephoneNo;
		var MobileNo 		= req.query.MobileNo;
		var GSTNo 		= req.query.GSTNo;
		var sqlQuery  		= 'CALL UpdateClientRecord(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
    	dbManager.RunQuery(sqlQuery, [RegistrationID, CompanyName, FirstName, LastName, 
                      Email, VatTinNo, DrugLicNo, TanNo, CSTNo, PanNo, Address, City, State, 
                      Country, PostalCode, TelephoneNo, MobileNo, GSTNo], function(err, rows){
    		if(!err || rows[0].res !== 0) {
    			console.log(rows);
    			var responce = JSON.stringify(rows[0]);
    			console.log('ServerResponce:=>' + responce);
                res.write(responce);
            	res.end();
            }  
    	});
	};
	
	self.UpdateRegistrationValidation = function(req,res) {
		var RegistrationID 	= req.query.RegistrationID;
		var CompanyName 	= req.query.CompanyName;
		var DrugLicNo 		= req.query.DrugLicNo;
		var TanNo 		= req.query.TanNo;
		var PostalCode 		= req.query.PostalCode;
		var ValidityInMonth 	= req.query.ValidityInMonth;
		var RegistrationKey 	= req.query.RegistrationKey;
		var sqlQuery  		= 'CALL UpdateRegistrationValidation(?,?,?,?,?,?,?);';
    	dbManager.RunQuery(sqlQuery, [RegistrationID, CompanyName, DrugLicNo, TanNo, PostalCode, ValidityInMonth,RegistrationKey], function(err, rows){
    		if(!err || rows[0].res !== 0) {
    			console.log(rows);
    			var responce = JSON.stringify(rows[0]);
    			console.log('ServerResponce:=>' + responce);
                res.write(responce);
            	res.end();
            }  
    	});
	};
	
	self.getRegisteredClientId = function(req,res) {
		var CompanyName = req.query.CompanyName;
		var DrugLicNo 	= req.query.DrugLicNo;
		var TanNo 	= req.query.TanNo;
		var PostalCode 	= req.query.PostalCode;
		var sqlQuery  	= 'CALL getRegisteredClientId(?,?,?,?);';
    	dbManager.RunQuery(sqlQuery, [CompanyName,DrugLicNo,TanNo,PostalCode], function(err, rows){
    		if(!err || rows[0].res !== 0) {
    			console.log(rows);
    			var responce = JSON.stringify(rows[0]);
    			console.log('ServerResponce:=>' + responce);
                res.write(responce);
            	res.end();
            }  
    	});
	};	
	
	self.getRegistrationCount = function(req,res) {
		var CompanyName = req.query.CompanyName;
		var DrugLicNo 	= req.query.DrugLicNo;
		var TanNo 	= req.query.TanNo;
		var PostalCode 	= req.query.PostalCode;
		var sqlQuery  	= 'CALL getRegistrationCount(?,?,?,?);';
    	dbManager.RunQuery(sqlQuery, [CompanyName,DrugLicNo,TanNo,PostalCode], function(err, rows){
    		if(!err || rows[0].res !== 0) {
    			console.log(rows);
    			var responce = JSON.stringify(rows[0]);
    			console.log('ServerResponce:=>' + responce);
                res.write(responce);
            	res.end();
            }  
    	});
	};
	
	self.getRegistrationInfo = function(req,res) {
		var RegistrationID 	= req.query.RegistrationID;
		var CompanyName 	= req.query.CompanyName;
		var DrugLicNo 		= req.query.DrugLicNo;
		var TanNo 		= req.query.TanNo;
		var PostalCode 		= req.query.PostalCode;
		var sqlQuery  		= 'CALL getRegistrationInfo(?,?,?,?,?);';
    	dbManager.RunQuery(sqlQuery, [RegistrationID,CompanyName,DrugLicNo,TanNo,PostalCode], function(err, rows){
    		if(!err || rows[0].res !== 0) {    			
    			console.log(rows);
    			var responce = JSON.stringify(rows[0]);
    			console.log('ServerResponce:=>' + responce);
                res.write(responce);
            	res.end();
            }  
    	});
	};
	
	self.getRegistrationCity = function(req,res) {
		var RegistrationID 	= req.query.RegistrationID;
		var sqlQuery  		= 'CALL getRegistrationCity(?);';
    	dbManager.RunQuery(sqlQuery, [RegistrationID], function(err, rows){
    		if(!err || rows[0].res !== 0) {
    			console.log(rows);
    			var responce = JSON.stringify(rows[0]);
    			console.log('ServerResponce:=>' + responce);
                res.write(responce);
            	res.end();
            }  
    	});
	};
	
	self.getRegistrationLocation = function(req,res) {
		var RegistrationID 	= req.query.RegistrationID;
		var sqlQuery  		= 'CALL getRegistrationLocation(?);';
    	dbManager.RunQuery(sqlQuery, [RegistrationID], function(err, rows){
    		if(!err || rows[0].res !== 0) {
    			console.log(rows);
    			var responce = JSON.stringify(rows[0]);
    			console.log('ServerResponce:=>' + responce);
                res.write(responce);
            	res.end();
            }  
    	});
	};
	
	self.sendRegistrationInfoMail = function(req, res) {
		var From 	= 'RegistrationInfo <info@squareupsoftware.com>';
		var To 	= res.Email;
		var Subject 	= 'Registration Info';
		var Text 	= 'Company Name: '+ req.query.CompanyName +'\nFirst Name: ' + req.query.FirstName + '\nLast Name: ' + req.query.LastName +
					 '\nEmail: ' + req.query.Email + '\nVat Tin No: ' + req.query.VatTinNo + '\nDrug Lic No: ' + req.query.DrugLicNo + 
					 '\nTan No: ' + req.query.TanNo + '\nCST No: ' + req.query.CSTNo + '\nPanNo: ' + req.query.PanNo + '\nAddress: ' +
					 req.query.Address + '\nCity: ' + req.query.City + '\nState: ' + req.query.State + '\nCountry: ' + req.query.Country +
					 '\nPostalCode: ' + req.query.PostalCode  + '\nPostalCode: ' + req.query.PostalCode + '\nTelephoneNo: ' +
					 req.query.TelephoneNo + '\nMobile No: ' + req.query.MobileNo;
		var Html 	= '<b><p>Company Name: '+ req.query.CompanyName +'<b><p>First Name: ' + req.query.FirstName + '<b><p>Last Name: ' + req.query.LastName +
					 '<b><p>Email: ' + req.query.Email + '<b><p>Vat Tin No: ' + req.query.VatTinNo + '<b><p>Drug Lic No: ' + req.query.DrugLicNo + 
					 '<b><p>Tan No: ' + req.query.TanNo + '<b><p>CST No: ' + req.query.CSTNo + '<b><p>PanNo: ' + req.query.PanNo + '<b><p>Address: ' +
					 req.query.Address + '<b><p>City: ' + req.query.City + '<b><p>State: ' + req.query.State + '<b><p>Country: ' + req.query.Country +
					 '<b><p>PostalCode: ' + req.query.PostalCode  + '<b><p>PostalCode: ' + req.query.PostalCode + '<b><p>TelephoneNo: ' +
					 req.query.TelephoneNo + '<b><p>Mobile No: ' + req.query.MobileNo;		
		
	    var results = [];
	    RegistrationInfoMail.SendMail(From, To, Subject, Text, Html, function(err, mailResponce){
			if(!err){
				results.push({MailResponce:mailResponce});		
			}else{
				return final();	
			}		
		});
	    
		 // Final task 
			function final() { 
				console.log('RegistrationInfo Mail Send Done: ', results);
				res.write(JSON.stringify(results));
				res.end();
			}
	};
};

module.exports = ClientRegestration;