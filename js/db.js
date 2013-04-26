/**
 * @author massih
 */

var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ_WRITE: 'readwrite' } ;

var dbVersion = 1;
var dbName = "jqmTodoDB";
var db;

function open_db(){
	var request = indexedDB.open(dbName);

	request.onerror = function(event) {
  		console.log(request.errorCode);
	};

	request.onupgradeneeded = function(event) {
		console.log("Creating ObjectStores....");
  		db = event.target.result;
  		var specificTask = db.createObjectStore("specificTask",{keyPath: "date"});
  		var generalTask = db.createObjectStore("generalTask",{keyPath: "dayofweek"});
  
 	};

	request.onsuccess = function(event) {
		console.log("Database opened !!!!");
		console.log(event.target.result.name +" --- "+ event.target.result.version +"---*---"+event.target.result.objectStoreNames.length);
		// db = request.result;
	};
}
