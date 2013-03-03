/**
 * @author massih
 */

Date.prototype.getMonthName = function() {
	var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return m[this.getMonth()];
}
Date.prototype.getDayName = function() {
	var d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return d[this.getDay()];
}
function get_end_date(month, year) {
	if (month == 1) {// February only!
		if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
			return 29;
		}
	}
	all_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return all_days_in_month[month];
}


$('#dates_page').live('pagebeforecreate', function(event) {
	var $dates_set = $("#dates_set");
	var today = new Date();
	var start_date = today.getDate();
	var end_date = get_end_date(today.getMonth(), today.getFullYear());
	// console.log(today.getDate() + " --- "+ end_date);
	for ( i = start_date; i <= end_date; i++) {
		var item_id = i + "-" + (today.getMonth + 1) + "-" + today.getFullYear();
		var item_title = i + "-" + today.getMonthName() + "-" + today.getFullYear();
		var content = "<div data-role='collapsible' id='" + item_id + "'><h3>" + item_title + "</h3></div>";
		// $new_item.append('<h3>' +  + '</h3>');
		$dates_set.append(content);
		// $("#dates_set").append($("div "));
	}
});

