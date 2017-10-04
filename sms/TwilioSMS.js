/**
 * New node file
 */
 

var TwiloSMS = function(){


	// Twilio Credentials 
	var accountSid = 'AC0f2b4151e1da40a19045b32839dde9d1'; 
	var authToken = '[AuthToken]';
	
	//  Scope.
    var self = this;
   //require the Twilio module and create a REST client 
    var client = require('twilio')(accountSid, authToken); 
    
	self.TwiloSMS = function(rMessage, PhoneNo, callback) {
		client.messages.create({ 
	    	to: "+91" + PhoneNo, 
	    	from: "+12053199235", 
	    	body: rMessage,   
	    }, function(err, responseData) { 
	    	if(!err){
	    		console.log(responseData.body);
	    		return callback(null, responseData.body);
	    	}else{
	    		console.log(err);
	    		return callback(err, 'Failed to send SMS : ' + PhoneNo + '\n');
	    	}
	    });
	};
};

module.exports = TwiloSMS;

