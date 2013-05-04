 

$('#dates_page').live('pagebeforecreate', function(event) {
	// window.indexedDB = window.indexedDB || window.webkitIndexedDB ||
                   // window.mozIndexedDB;
// 
	// if ('webkitIndexedDB' in window) {
	  // window.IDBTransaction = window.webkitIDBTransaction;
	  // window.IDBKeyRange = window.webkitIDBKeyRange;
	// }
	
	for(i=1;i<=52;i++){
		$("#weekNumberBox").append($("<option></option>").attr("value", i).text(" Week "+i));
	}
	var weekNumber = new Date().getWeekNumber();
	$("#weekNumberBox option[value="+weekNumber+"]").attr("selected",true);
	createDateSet(weekNumber);
	
	
	// console.log("new WeekNumber -->"+getWeekNumber(new Date()));
	
	// var startDate = today.getDate();
	// var endDate = getEndDate(today.getMonth(), today.getFullYear());
	// var dayOfWeek = today.getDay();

	
	// for ( i = startDate; i <= endDate; i++) {
		// var itemId = i + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
		// var itemTitle = getDayName(dayOfWeek) + "  " + i + "-" + today.getMonthName() + "-" + today.getFullYear();
		// var content = "<div data-role='collapsible' class='my_collapsible_dates' dayOfWeek='"+getDayName(dayOfWeek)+"' id='" + itemId + "'><h3>" + itemTitle + "</h3></div>";
		// $dates_set.append(content);
		// $('#'+itemId).append('<ul data-role="listview" id="'+itemId+'-ul" data-split-icon="minus" data-split-theme="d" data-inset="true" data-divider-theme="d"></ul>');
		// dayOfWeek = (dayOfWeek + 1) % 7;
	// }
});

$('#dates_page').live('pageinit', function() {
	

	$('.my-popup-date').hide();

	open_db();
	// if (!window.indexedDB) {
  		// window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  		// return false;
	// }
	
	
	$("#taskType").change(function() {
		if($(this).val() == 'Specific-date'){
			$('.my-popup-date').hide();
			$('#specificDate').show();
		}else if($(this).val() == 'Days-of-week'){
			$('.my-popup-date').hide();
			$('#daysOfWeek').show()
		}else{
			$('.my-popup-date').hide();
		}
    	// alert($(this).find("option:selected").text()+' clicked!');
    	 // alert($(this).val());
	});
	
	
	$('#newTaskSaveButton').bind('click',function(){
		var $taskName = $('#taskName').val();
		var $taskType = $('#taskType').find(":selected").val();
		// console .log("tn-> "+$taskName +" tt-> "+$taskType);
		// **************VALIDATION REQUIRED ***********************
		
		if($.trim($taskName).length == 0){
			// $("#taskName").css('border', "1px solid red"); 
			 // $('label[for="taskName"]').css({"color":"red","font-Weight": "bold"});
		}
// 		
		if($taskName.length !=0){
			if($taskType == 'Today'){
				var d = new Date();
				var date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
				var task = {timeStamp : d.getTime() , date: date , taskName: $taskName , done : false};
				saveTask("specificTask",task);
			}else if($taskType == 'Tommorow'){
				var d = new Date();
				d.setDate(d.getDate()+1);
				var date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
				var task = {timeStamp : new Date().getTime() , date: date , taskName: $taskName , done : false};
				saveTask("specificTask",task);
			}else if($taskType == 'Specific-date'){
				var d = new Date($("#dateInput").val());
				var date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
				var task = {timeStamp : new Date().getTime() , date: date , taskName: $taskName , done : false};
				saveTask("specificTask",task);
			}else if($taskType == 'Days-of-week'){
				var $daysOfWeek = $('#daysOfWeek input:checked');
				$daysOfWeek.each(function() {
					var task = {timeStamp : new Date().getTime() , dayOfWeek : $(this).attr('name') , taskName : $taskName};
			    	saveTask("generalTask",task);
				});
				
			}else if($taskType == 'Everyday'){
				console.log("*****EVERYDAY****");
				for(var i=0;i<7;i++){
					var d = new Date();
					// var task = {timeStamp : d.getTime() , dayOfWeek : days[i].toLowerCase , taskName : $taskName};
					
					setTimeout(console.log("day -->" + getDayName(i).toLowerCase() +" timeStamp = " + d.getTime()),10000);
					// saveTask("generalTask",task);
				}
				// saveTask("specificTask",task);
			}
			$("#newTask").popup("close");
		}else{
			console.log("Incomplete !!!!");	
		}		
	});
	
	$('#clearAll').bind('click',function(){
		console.log(localStorage.length);
		localStorage.clear();
		console.log(localStorage.length);
	});

	$(".my_collapsible_dates").bind("expand", function(event) {
		// getTask("specificTask","date",event.target.id,event.target.id);
		// getTask("generalTask","dayOfWeek",$('#'+event.target.id).attr('dayOfWeek'),event.target.id);
		
		getTasks($('#'+event.target.id).attr('dayOfWeek').toLowerCase(),event.target.id);
		
		// var $element = $('#'+event.target.id+' div');
		// var $dayOfWeek = $('#'+event.target.id).attr('dayOfWeek');
		// var $planned = false;
		// var $ul = $('#'+event.target.id+'-ul');
		
		// $.when(specificTasks).done(function(result){
			// console.log("inside WHEN THEN specific task *********" + db);
			// if(result.length > 0){
				// ul.append('<li data-role="list-divider">Specific Tasks</li>');
				// for (var i in specificTasks) {
					// $ul.append('<li><a href="#"> '+result[i].taskName +'</a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a> </li>');	
				// }
				// $planned = true;
			// }
		// });
		

		
		
		// if(specificTasks.length > 0){
			// console.log("inside specific task *********");
			// ul.append('<li data-role="list-divider">Specific Tasks</li>');
			// for (var i in specificTasks) {
				// $ul.append('<li><a href="#"> '+specificTasks[i].taskName +'</a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a> </li>');	
			// }
			// $planned = true;
		// }
		// if(generalTasks.length > 0){
			// ul.append('<li data-role="list-divider">Genral Tasks</li>');
			// for (var i in generalTasks) {
				// $ul.append('<li><a href="#"> '+generalTasks[i].taskName +'</a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a> </li>');	
			// }
			// $planned = true;
		// }
		
		// if(!$planned){
			// $ul.append('<li> Do Nothing :)   </li>');
		// }
		
		
		
		// if(supports_html5_storage()){
			// if(localStorage[event.target.id] != null){
				// $ul.append('<li><a href="#"> '+localStorage[event.target.id] +'</a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a> </li>');	
				// $planned = true;
				// // $ul.listview( "refresh" );
			// } 
			// if(localStorage[$dayOfWeek] != null || localStorage["everyday"] != null ){
				// ul.append('<li data-role="list-divider">General Tasks</li>');
				// if(localStorage[$dayOfWeek] != null){
					// $ul.append('<li><a href="#"> '+$dayOfWeek +' job </a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a></li>');	
					// $planned = true;				
				// }
				// if(localStorage["everyday"] != null){
					// $ul.append('<li><a href="#"> everyday job </a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a></li>');
					// $planned = true;
				// }
			// }
			// if(!$planned){
				// $ul.append('<li> Do Nothing :)   </li>');
			// }
// 			
		// }else{
			// $element.append('<p> HTML5 storage not supported !  </p>');	
		// }
		// localStorage[event.target.id] = "First task !";//TEST ************
		// console.log(event.target.id);
		// $ul.listview( "refresh" );

	});
	
	$(".my_collapsible_dates").bind("collapse", function(event) {
		$('#'+event.target.id+'-ul').empty();
	});
});

function createDateSet(weekNumber){
	var $dates_set = $("#dates_set");
	var firstDay = getDatesOfWeek(weekNumber);
	for ( i = 0; i < 7; i++) {
		firstDay.setDate(firstDay.getDate() + 1);
		var itemId = firstDay.getDate() + "-" + (firstDay.getMonth() + 1) + "-" + firstDay.getFullYear();
		var itemTitle = getDayName(firstDay.getDay()) + "   " + firstDay.getDate() + "-" + firstDay.getMonthName() + "-" + firstDay.getFullYear();
		var content = "<div data-role='collapsible' class='my_collapsible_dates' dayOfWeek='" + getDayName(firstDay.getDay()) + "' id='" + itemId + "'><h3>" + itemTitle + "</h3></div>";
		$dates_set.append(content);
		$('#' + itemId).append('<ul data-role="listview" id="' + itemId + '-ul" data-split-icon="minus" data-split-theme="d" data-inset="true" data-divider-theme="d"></ul>');
	}
}


function createTaskList(taskType,id,task) {

	var $element = $('#' + id + ' div');
	var $dayOfWeek = $('#' + id).attr('dayOfWeek');
	var $planned = false;
	var $ul = $('#' + id + '-ul');
	if(taskType == "specificTask"){
		if($ul.has($('#specificTaskDivider')).length == 0){
			$ul.append('<li data-role="list-divider" id="specificTaskDivider">Specific Tasks</li>');
		}	
		$("#specificTaskDivider").after('<li><a href="#" > ' + task.taskName + '</a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a> </li>');
	}else if(taskType == "generalTask"){
		if($ul.has($('#generalTaskDivider')).length == 0){
			$ul.append('<li data-role="list-divider" id="generalTaskDivider">General Tasks</li>');
		}	
		$("#generalTaskDivider").after('<li><a href="#" > ' + task.taskName + '</a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a> </li>');		
	}
	
	// $ul.append('<li><a href="#" > ' + task.taskName + '</a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a> </li>');
	$ul.listview( "refresh" );
// 	
	// db.transaction("specificTask").objectStore("specificTask").index("date").openCursor(IDBKeyRange.only(event.target.id)).onsuccess = function(event) {
		// var cursor = event.target.result;
		// var counter = 0;
		// if (cursor) {
			// if (counter == 0) {
				// ul.append('<li data-role="list-divider">Specific Tasks</li>');
			// }
			// $ul.append('<li><a href="#"> ' + cursor.value.taskName + '</a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a> </li>');
			// if (!$planned) {
				// $planned = true;
			// }
			// counter++;
			// cursor.
			// continue();
		// }
	// };
}



function save_task(){
	if (!window.indexedDB) {
  	  window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
	}
	
}




Date.prototype.getMonthName = function() {
	var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return m[this.getMonth()];
}
// Date.prototype.getWeekNumber = function() {
// var onejan = new Date(this.getFullYear(),0,1);
// return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
// }
Date.prototype.getWeekNumber = function() {
    // Copy date so don't modify original
    d = new Date(this);
    d.setHours(0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
    // Return array of year and week number
    return weekNo;
}



function getDatesOfWeek(weekNumber) {
	var yearStart = new Date(new Date().getFullYear(), 0, 1);
	var addition = ((weekNumber - 1) * 7);
	yearStart.setDate(yearStart.getDate() + addition);
	var first = yearStart.getDate() - yearStart.getDay(); // First day is the day of the month - the day of the week
	yearStart.setDate(first);
	return yearStart;
}


function getDayName(day) {
	var d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return d[day];
}

function getDayName_short(day) {
	var d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return d[day];
}

function getEndDate(month, year) {
	if (month == 1) {// February only!
		if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
			return 29;
		}
	}
	all_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return all_days_in_month[month];
}




function supports_html5_storage() {
	return ('localStorage' in window) && window['localStorage'] !== null;
}