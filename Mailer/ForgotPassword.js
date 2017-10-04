/**
 * Define ForgotPassword
 */

var ForgotPassword = function(){

	var Mailer = require("./Mailer.js");
	var forgotmailer = new Mailer(); 
	
	var TwilioSMS = require("../sms/TwilioSMS.js");
	
	var tSMS = new TwilioSMS();
	
	//  Scope.
    var self = this;
	self.ForgotPassword = function(req,res) {
		var From 	= 'MedociInfra <medicoinfra@gmail.com>';
		var To 	= req.query.Email;
		var Subject 	= 'MedicoInfra User Password';
		var Text 	= 'Company Name: '+ req.query.CompanyName +'\nUser Name: ' + req.query.UserName + '\nPassword: ' + req.query.Password;
		var Html 	= '<b><p>Company Name: '+ req.query.CompanyName +'</p><p>User Name: ' + req.query.UserName + '</p><p>Password: ' + req.query.Password + '</p></b>';		
		
	    var results = [];
		forgotmailer.SendMail(From, To, Subject, Text, Html, function(err, mailResponce){
			if(!err){
				results.push({MailResponce:mailResponce});
				tSMS.TwiloSMS(Text, req.query.PhoneNo,  function(err, smsResponce){
					if(!err){
						results.push({SMSResponce:smsResponce});
						return final();
					}else{
						results.push({SMSResponce:'Failed to send SMS :' + req.query.PhoneNo});
						return final();	
					}
				});
			}else{
				return final();	
			}		
		});
	    
		 // Final task 
			function final() { 
//				console.log('Done', results);
				res.write(JSON.stringify(results));
				res.end();
			}
	};
};

module.exports = ForgotPassword;