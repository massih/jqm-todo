/**
 * @author massih
 */

var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || { READ_WRITE: 'readwrite' } ;

var dbVersion = 2;
var dbName = "jqmTodoDB";
var db;

function open_db(){
	if(!indexedDB){
		alert("your browser doesnt support HTML5 storage, It sucks !!!!");
	}
	var request = indexedDB.open(dbName,dbVersion);

	request.onerror = function(event) {
  		console.log(request.errorCode);
	};

	request.onupgradeneeded = function(event) {
		console.log("Creating ObjectStores....");
  		db = event.target.result;
  		if(db.objectStoreNames.contains("specificTask")) {
      		db.deleteObjectStore("specificTask");
      		console.log("deleting specificTask");
    	}
    	if(db.objectStoreNames.contains("generalTask")){
    		db.deleteObjectStore("generalTask");
    		console.log("deleting genralTask");
    	}
  		
  		var specificTask = db.createObjectStore("specificTask",{keyPath: "timeStamp"});
  		specificTask.createIndex("taskName","taskName",{unique : false});
  		specificTask.createIndex("date","date",{unique : false});
  		var generalTask = db.createObjectStore("generalTask",{keyPath: "timeStamp"});
		generalTask.createIndex("taskName","taskName",{unique : false});
		generalTask.createIndex("dayOfWeek","dayOfWeek",{unique : false});  
 	};

	request.onsuccess = function(event) {
		console.log("Database opened !!!!");
		console.log("DbName : "+event.target.result.name +" | Version : "+ event.target.result.version +" | number of ObjectStores : "+event.target.result.objectStoreNames.length);
		db = this.result;
	};
}

function saveTask(ObjStoreName, taskObj){
	console.log("objName  --> " + ObjStoreName);
	console.log("TaskObj--> " + taskObj.dayOfWeek +" -- "+taskObj.taskName+" -- "+taskObj.timeStamp);
	var request = db.transaction(ObjStoreName,"readwrite").objectStore(ObjStoreName).add(taskObj);
	request.onsuccess = function(event){
		console.log("save successfully --> " + taskObj.taskName);
	};
	request.onerror = function(event){
		console.log("save UNsuccessfully --> " + event.target.errorCode);
	};
	
	// var transaction = db.transaction([ObjStoreName], "readwrite");
	// transaction.oncomplete = function(event) {
	  // console.log("All done!");
	// };
// 	 
	// transaction.onerror = function(event) {
		// console.log("Database error: " + event.target.errorCode);
	// };
	// var objectStore = transaction.objectStore(ObjStoreName);
	// var request = objectStore.add(taskObj);
	// request.onsuccess = function(event) {
    	// console.log("save successfully --> ");
  	// };
  	// request.onerror = function(event) {
    	// console.log("save error -->" + event.target.errorCode	);
  	// };
//   	
}

function updateTask(){
	
}

function deleteTask(){
	
}

function getTasks(dayOfWeek,date){
	var totalTask = 0;
	var tr = db.transaction(["specificTask","generalTask"]);
	console.log("dow->"+dayOfWeek+"  ***   date->"+date); 
	tr.objectStore("specificTask").index("date").openCursor( IDBKeyRange.only(date) ).onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			createTaskList("specificTask",date,cursor.value);
			totalTask ++;
	    	cursor.continue();
	  	}	  	
	};
	
	tr.objectStore("generalTask").index("dayOfWeek").openCursor( IDBKeyRange.only(dayOfWeek) ).onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			createTaskList("generalTask",date,cursor.value);
			totalTask ++;
	    	cursor.continue();
	  	}	  	
	};
	// if(){}
	// db.transaction("specificTask").objectStore("specificTask").openCursor().onsuccess = function(event) {
	  // var cursor = event.target.result;
	  // if (cursor) {
	    // console.log(" Date is -->" + cursor.key + " ** and task name is --> " + cursor.value.taskName);
	    // cursor.continue() ;
	  // }
	  // else {
	    // console.log("No more entries!");
	  // }
	// };
}
