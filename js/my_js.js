 
$('#login_page').live('pageinit', function(event) {
	
	open_db();
	$('#loginAllow').bind('click',function(){
		handleAuthClick();
		$.mobile.loading( "show", {
	            text: '',
	            textVisible: false,
	            theme: 'd',
	            textonly: false,
	            html: ''
	    });
		
	});
	
	$('#loginPopupButton').trigger("click");
});


$('#dates_page').live('pagebeforecreate', function(event) {
	// window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
	// if ('webkitIndexedDB' in window) {
	  // window.IDBTransaction = window.webkitIDBTransaction;
	  // window.IDBKeyRange = window.webkitIDBKeyRange;
	// }
	
	for(i=1;i<=52;i++){
		$("#weekNumberList").append($("<option></option>").attr("value", i).text(" Week "+i));
	}
	var weekNumber = new Date().getWeekNumber();
	$("#weekNumberList option[value="+weekNumber+"]").attr("selected",true).text(" Week " + weekNumber +" (current week) ");
	createDateSet(weekNumber);
});

$('#dates_page').live('pageinit', function() {
	
	$('.my-popup-date').hide();

	// handleClientLoad();
		
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
		console.log("clicked !!!!!");
		$('#loginPopupButton').trigger("click");
		// $('#loginPopup').popup("open");
		// localStorage.clear();
		// console.log(localStorage.length);	
	});
	
	$('#nextWeekBtn').bind('click',function(){
		var $selectedWeek = $('#weekNumberList').find(":selected");
		if($selectedWeek.val() == 52){
			return;
		}
		$selectedWeek.attr("selected",false);
		$selectedWeek.next("option").attr("selected",true);
		$("#weekNumberList").selectmenu( "refresh" );
		createDateSet($('#weekNumberList').find(":selected").val());
	});

	$('#lastWeekBtn').bind('click',function(){
		var $selectedWeek = $('#weekNumberList').find(":selected");
		// if($selectedWeek.val() == 1){
			// return;
		// }
		$selectedWeek.attr("selected",false);
		$selectedWeek.prev("option").attr("selected",true);
		$("#weekNumberList").selectmenu( "refresh" );
		createDateSet($('#weekNumberList').find(":selected").val());
	});
	
	$("#weekNumberList").change(function() {
		createDateSet($(this).val());
	});


});


function createDateSet(weekNumber){
	var $collapsibles = $("#dates_set div[data-role=collapsible]");
	var firstDay = getDatesOfWeek(weekNumber);
	var $dates_set = $("#dates_set");	
	$dates_set.find("div[data-role=collapsible]").remove();
	for ( i = 0; i < 7; i++) {
		var itemId = firstDay.getDate() + "-" + (firstDay.getMonth() + 1) + "-" + firstDay.getFullYear();
		var itemTitle = getDayName(firstDay.getDay()) + "   " + firstDay.getDate() + "-" + firstDay.getMonthName() + "-" + firstDay.getFullYear();
		var content = "<div data-role='collapsible' class='my_collapsible_dates' dayOfWeek='" + getDayName(firstDay.getDay()) + "' id='" + itemId + "'><h3>" + itemTitle + "</h3></div>";
		$dates_set.append(content);
		$('#' + itemId).append('<div><ul data-role="listview" id="' + itemId + '-ul" data-split-icon="minus" data-split-theme="d" data-inset="true" data-divider-theme="d"></ul></div>');
		firstDay.setDate(firstDay.getDate() + 1);
	}
	if($collapsibles.length != 0){
		$dates_set.collapsibleset({ corners: true });
		$("#dates_set ul[data-role=listview]").listview();
	}
	
	$("#dates_set div[data-role=collapsible]").bind("expand", function(event) {
		console.log("expand !!!");
		getTasks($('#' + event.target.id).attr('dayOfWeek').toLowerCase(), event.target.id);
	});
	$("#dates_set div[data-role=collapsible]").bind("collapse", function(event) {
		console.log("collapsed !!!");
		$('#' + event.target.id + '-ul').empty();
	}); 
	
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
	
	if ($ul.hasClass('ui-listview')) {
        $ul.listview('refresh');
    } else {
        $ul.trigger('create');
    }
	// $ul.listview( "refresh" );
}





Date.prototype.getMonthName = function() {
	var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return m[this.getMonth()];
}

Date.prototype.getWeek = function() {
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
Date.prototype.getWeekNumber = function () {
/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.epoch-calendar.com */
	var dowOffset = 1;
	dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
	var newYear = new Date(this.getFullYear(),0,1);
	var day = newYear.getDay() - dowOffset; //the day of week the year begins on
	day = (day >= 0 ? day : day + 7);
	var daynum = Math.floor((this.getTime() - newYear.getTime() - 
	(this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
	var weeknum;
	//if the year starts before the middle of a week
	if(day < 4) {
		weeknum = Math.floor((daynum+day-1)/7) + 1;
		if(weeknum > 52) {
			nYear = new Date(this.getFullYear() + 1,0,1);
			nday = nYear.getDay() - dowOffset;
			nday = nday >= 0 ? nday : nday + 7;
			/*if the next year starts before the middle of
 			  the week, it is week #1 of that year*/
			weeknum = nday < 4 ? 1 : 53;
		}
	}
	else {
		weeknum = Math.floor((daynum+day-1)/7);
	}
	return weeknum;
};



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