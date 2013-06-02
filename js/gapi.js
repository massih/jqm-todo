
var clientId = '44447218164-3i2o9cj5cgm1qnsq9e3rjdajcq8hsjvd.apps.googleusercontent.com';
var apiKey = 'AIzaSyCuVQDQfQg4QWmYdi2MxbyUMNJHTJgVBno';
var scopes = 'https://www.googleapis.com/auth/tasks';

function handleClientLoad() {
	gapi.client.setApiKey(apiKey);
	console.log("API key set !");
	// $('#loginPopupButton').trigger('click');
	// window.setTimeout(checkAuth, 1);
}

function checkAuth() {
	gapi.auth.authorize({
		client_id : clientId,
		scope : scopes,
		immediate : true
	}, handleAuthResult);
}

function handleAuthResult(authResult) {
	// var authorizeButton = document.getElementById('clearAll');
	if (authResult && !authResult.error) {
		// authorizeButton.style.visibility = 'hidden';
		makeApiCall();
		console.log("GAPI --> if true");
	} else {
		console.log("GAPI --> if NOT true");
		// authorizeButton.style.visibility = '';
		// authorizeButton.onclick = handleAuthClick;
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
	console.log("GAPI --> makeApiCall() function loaded");
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
}

//
// var restRequest = gapi.client.request({
// 'path': '/users/@me/lists',
// 'params': {'query': 'Google+', 'orderBy': 'best'}
// });
// restRequest.execute(function(resp) { console.log(resp); });