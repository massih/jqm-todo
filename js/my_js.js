/**
 * @author massih
 */

$('#dates_page').live('pagebeforecreate', function(event) {
	// window.indexedDB = window.indexedDB || window.webkitIndexedDB ||
                   // window.mozIndexedDB;
// 
	// if ('webkitIndexedDB' in window) {
	  // window.IDBTransaction = window.webkitIDBTransaction;
	  // window.IDBKeyRange = window.webkitIDBKeyRange;
	// }

	var $dates_set = $("#dates_set");
	var today = new Date();
	var startDate = today.getDate();
	var endDate = getEndDate(today.getMonth(), today.getFullYear());
	var dayOfWeek = today.getDay();
	
	for ( i = startDate; i <= endDate; i++) {
		var itemId = i + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
		var itemTitle = getDayName(dayOfWeek) + "  " + i + "-" + today.getMonthName() + "-" + today.getFullYear();
		var content = "<div data-role='collapsible' class='my_collapsible_dates' dayOfWeek='"+getDayName(dayOfWeek)+"' id='" + itemId + "'><h3>" + itemTitle + "</h3></div>";
		$dates_set.append(content);
		$('#'+itemId).append('<ul data-role="listview" id="'+itemId+'-ul" data-split-icon="minus" data-split-theme="d" data-inset="true" data-divider-theme="d"></ul>');
		dayOfWeek = (dayOfWeek + 1) % 7;
	}
});

$('#dates_page').live('pageinit', function() {

	$('.my-popup-date').hide();
	
	if (!window.indexedDB) {
  		window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  		return false;
	}
	
	var request = window.indexedDB.open("MyTestDatabase");
	var db;
	request.onerror = function(event) {
  		console.log(request.errorCode);
	};
	request.onsuccess = function(event) {
		db = request.result;
	};
	
	
	$("#taskType").change(function() {
		if($(this).val() == 'Specific-date'){
			$('.my-popup-date').hide();
			$('#specificDate').show();
		}else if($(this).val() == 'Days-of-week'){
			$('.my-popup-date').hide();
			$('#daysOfWeek').show()
		}
    	// alert($(this).find("option:selected").text()+' clicked!');
    	 // alert($(this).val());
	});
	
	$('#clearAll').bind('click',function(){
		console.log(localStorage.length);
		localStorage.clear();
		console.log(localStorage.length);
	});

	$(".my_collapsible_dates").bind("expand", function(event) {
		var $element = $('#'+event.target.id+' div');
		var $dayOfWeek = $('#'+event.target.id).attr('dayOfWeek');
		var $planned = false;
		var $ul = $('#'+event.target.id+'-ul');

		if(supports_html5_storage()){
			if(localStorage[event.target.id] != null){
				$ul.append('<li><a href="#"> '+localStorage[event.target.id] +'</a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a> </li>');	
				$planned = true;
				// $ul.listview( "refresh" );
			} 
			if(localStorage[$dayOfWeek] != null || localStorage["everyday"] != null ){
				ul.append('<li data-role="list-divider">General Tasks</li>');
				if(localStorage[$dayOfWeek] != null){
					$ul.append('<li><a href="#"> '+$dayOfWeek +' job </a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a></li>');	
					$planned = true;				
				}
				if(localStorage["everyday"] != null){
					$ul.append('<li><a href="#"> everyday job </a><a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Delete item</a></li>');
					$planned = true;
				}
			}
			if(!$planned){
				$ul.append('<li> Do Nothing :)   </li>');
			}
			
		}else{
			$element.append('<p> HTML5 storage not supported !  </p>');	
		}
		localStorage[event.target.id] = "First task !";//TEST ************
		// console.log(event.target.id);
		$ul.listview( "refresh" );

	});
	
	$(".my_collapsible_dates").bind("collapse", function(event) {
		$('#'+event.target.id+'-ul').empty();
	});
});





function save_task(){
	if (!window.indexedDB) {
  	  window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.")
	}
	
}




Date.prototype.getMonthName = function() {
	var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return m[this.getMonth()];
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