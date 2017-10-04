/**
 * Define the ClientInventory.
 */

var ClientInventory = function(dbManager){
	
	//  Scope.
    var self = this;	
	
	self.UpdateInventoryRecords = function(req,res){
		var ClientId 	= req.query.ClientId;
    	var jsonContent = req.query.InventoryData;
    	var jsondata = JSON.parse(jsonContent);  
    	
		// Async task 
		function async(arg, callback) {
		  setTimeout(function() { callback(arg * 2); }, 1000);
		}
		// Final task 
		function final() { 
//			console.log('Done', results);
			res.write(JSON.stringify(results));
			res.end();
		}
		
		var results = [];
		function UpdateRecord(exjson) {
		  if(exjson) {
		    async( exjson, function(result) {
		    	var ProductId 		= exjson.ProductId;
				var ProductName 	= exjson.ProductName;
				var GenericName 	= exjson.GenericName;
				var ManufactureName = exjson.ManufactureName;
				var Schedile 		= exjson.Schedile;
				var DosageInMg 		= exjson.DosageInMg;
				var ProductQty 		= exjson.ProductQty;
				var sqlQuery  		= 'CALL UpdateClientInventoryRecord(?,?,?,?,?,?);'; 			 
				dbManager.RunQuery(sqlQuery, [ClientId,ProductName,GenericName,ManufactureName,DosageInMg,ProductQty], function(err, rows){
					if(err) {						 
				      return new UpdateRecord(jsondata.shift());
					}
					results.push({ProductId:ProductId});
				});
		      return new UpdateRecord(jsondata.shift());
		    });
		  } else {
		    return final();
		  }
		}
		UpdateRecord(jsondata.shift());
	};
	
	self.getProductCount = function(req,res) {
		var sqlQuery  	= 'CALL getProductCount();';
    	dbManager.RunQuery(sqlQuery, [], function(err, rows){
    		if(!err) {
//    			console.log(rows);
//    			console.log('ServerResponce:=>' + JSON.stringify(rows[0]));
                res.write(JSON.stringify(rows[0]));
            	res.end();
            }  
    	});
	};
	
	self.getProductList = function(req,res) {
		var Limit 	= req.query.Limit;
		var Offset 	= req.query.Offset;
		var sqlQuery  		= 'CALL getProductList(?,?);';
    	dbManager.RunQuery(sqlQuery, [Limit,Offset], function(err, rows){
    		if(!err || rows[0].res !== 0) {
//    			console.log(rows);
//    			console.log('ServerResponce:=>' + JSON.stringify(rows[0]));
                res.write(JSON.stringify(rows[0]));
            	res.end();
            }  
    	});
	};
};

module.exports = ClientInventory;