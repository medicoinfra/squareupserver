/**
 * Define the Mailer
 */

var mailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var Mailer = function(){
	
	//  Scope.
    var self = this;

    self.SendMail = function(from, to, subject, text, html, callback){// Use Smtp Protocol to send Email
    	var transport = mailer.createTransport((smtpTransport({
    		type: 'smtp'		
			, secureConnection: true // use SSL
			, port: 465 // port for secure SMTP
			, service: 'Gmail'
	        , auth: {
                user: "medicoinfra@gmail.com",
                pass: "manash@1710129"
            },
			maxConnections: 5,
			maxMessages: 200
        })));
        var mail = {
	        from: from,
	        to: to,
	        subject: subject,
	        text: text,
	        html: html
    	};
        
        // Define a success handler.
        var successHandler = function(){
            console.log( "Success!" );
        };
        
        // Define a fail handler.
        var failHandler = function(){
            console.log( "Fail :(" );
        };

        transport.sendMail(mail, function(error, response){            
            transport.close();
            if(error){
            	return callback(error, failHandler);
            }else{
            	return callback(null, "Mail sent: " + successHandler);
            }
        });  
    };
};

module.exports = Mailer;