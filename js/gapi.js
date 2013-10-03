
var clientId = '44447218164-3i2o9cj5cgm1qnsq9e3rjdajcq8hsjvd.apps.googleusercontent.com';
var apiKey = 'AIzaSyCuVQDQfQg4QWmYdi2MxbyUMNJHTJgVBno';
var scopes = 'https://www.googleapis.com/auth/tasks';

function handleClientLoad() {
	gapi.client.setApiKey(apiKey);
}

function checkAuth() {
	gapi.auth.authorize({
		client_id : clientId,
		scope : scopes,
		immediate : true
	}, handleAuthResult);
}

function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
		console.log("GAPI --> if true");
		makeApiCall();
	} else {
		console.log("GAPI --> if NOT true");
	}
}

function handleAuthClick() {
	gapi.auth.authorize({
		client_id : clientId,
		scope : scopes,
		immediate : false
	}, handleAuthResult);
	return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
	// console.log(gapi.auth.getToken());
	// gapi.client.load('oauth2', 'v2', function(){
		// gapi.client.oauth2.userinfo.v2.me.get().execute(function(resp){
			// console.log( resp);	
		// });
// 		
	// });
	$.mobile.loading( "hide" );
	// $('#loginPopup').popup('close');
	$.mobile.changePage( "#dates_page", { transition: "slideup", changeHash: false });
	gapi.client.load('tasks', 'v1', handleLoadedApi);

}

function handleLoadedApi(){
	// console.log(gapi.client.tasks.tasklists.list());
	gapi.client.tasks.tasklists.list().execute(function(response){
		console.log(response)
		var taskLists = response.items;
		for(i in taskLists){
			console.log("Tasklist --> " + i +"-"+taskLists[i].title);
		}
	});
	// var request = gapi.client.plus.people.get({
			// 'userId' : 'me'
		// });
}

	// gapi.client.load('plus', 'v1', function() {
		// var request = gapi.client.plus.people.get({
			// 'userId' : 'me'
		// });
		// request.execute(function(resp) {
			// var heading = document.createElement('h4');
			// var image = document.createElement('img');
			// image.src = resp.image.url;
			// heading.appendChild(image);
			// heading.appendChild(document.createTextNode(resp.displayName));
// 
			// document.getElementById('content').appendChild(heading);
		// });
	// });


//
// var restRequest = gapi.client.request({
// 'path': '/users/@me/lists',
// 'params': {'query': 'Google+', 'orderBy': 'best'}
// });
// restRequest.execute(function(resp) { console.log(resp); });