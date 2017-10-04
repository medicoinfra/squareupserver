
//ServerUpdate.js

var api = {
    ServerUpdate: function(request, response){
        response.write("Welcome to ServerUpdate1!\n\n");
    }
};

function printHello(){
   console.log( "Hello, World!");
}
module.exports = api;