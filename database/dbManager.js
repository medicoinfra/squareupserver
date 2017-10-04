/**
 *  Define the MedicoinfraSqlClient.
 */
/**
 * mysql_client
 */

// Import modules
var mysql = require('mysql');
var path = require('path');
var fs = require('fs');
var async = require('async');
var Q = require('q');

// Constants
var DEFAULT_MYSQL_PORT = 3306;
var DEFAULT_AUTOCOMMIT = false;
var DEFAULT_CONNLIMIT = 100;

/**
 * MySQL Class Wrapper
 * @param {string} user: user of database account
 * @param {string} password: password for database account
 * @param {string} database: database name
 * @param {string} host: hostname of server
 * @param {string} port: port of server
 * @param {boolean} autocommit: autocommit
 * @return {object} object
 */

require('events').EventEmitter.defaultMaxListeners = Infinity;

var MedicoinfraSqlClient = function() {
	 //  Scope.
    var self = this;
    this.pool = null;
    this.connProp = {
            connectionLimit : 100, //important
            host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
            user     : 'adminysE9Cc1',
            password : 'vsZzcKT9bF6A',
            port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
            database : 'medicoinfraserverdb',
			debug    :  false
    };	
	
    this.RunQuery = function RunQuery(query, parameters, callback) {
	    this.pool.on('enqueue', function () {
	        console.error('RunQuery-Waiting for available connection slot-ERROR');
	        return callback('pool-not-empty');
	    });
//	    console.log('running mysql query:', query);
	    this.pool.getConnection(function(err, connection) {
	        if (err) {
	            console.error('RunQuery-cannot getConnection ERROR:', err);
	            return callback(err);
	        }
	        var deferred = Q.defer();
	        connection.query(self.prepareQuery(query, parameters), function(err, rows) {
	            if (err) {
	                console.error('RunQuery-cannot run query ERROR:', err);
	                return callback(err);
	            }
	            deferred.resolve(rows);
	            connection.release();
	            return callback(null, rows);
	        });
	        deferred.promise;
	    });
	};
	
	this.connect = function connect(callback) {
		if(this.pool===null){
		    this.pool = mysql.createPool(this.connProp);
		}
	
	    // verify connection
	    this.pool.getConnection(function(err, connection) {
	        console.log('connecting mysql');
	        if (err) {
	            console.error('ERROR connecting to mysql server with connProp:', this.connProp);
	            return callback(err);
	        }
	        connection.release();
	        return callback(null);
	    });
	};
	
	this.disconnect = function disconnect(callback) {
	    var pool = this.pool;
	    pool.getConnection(function(err, connection) {
	        console.log('disconnecting mysql');
	        if (err) {
	            console.error('ERROR disconnecting to mysql server with connProp:', this.connProp);
	            return callback(err);
	        }
	        connection.release();
	        pool.end();
	        return callback(null);
	    });
	};
	
	//Custom format
	//("UPDATE posts SET title = :title", { title: "Hello MySQL" })
	this.customQueryFormat = function (query, parameters) {
		  if (!parameters){
			  return query;
		  }
		  return query.replace(/\:(\w+)/g, function (txt, key) {
		    if (parameters.hasOwnProperty(key)) {
		      return mysql.escape(parameters[key]);
		    }
		    return txt;
		  }.bind(this));
	};
	
	this.prepareQuery = function(query, parameters){
	    if(!query || !parameters) {
	        throw  new Error('query and parameters function parameters should be specified.');
	    }else{
	        console.log("Prepare Query String: " + mysql.format(query, parameters));
	    }
	    return mysql.format(query, parameters);
	};
};

module.exports = MedicoinfraSqlClient;