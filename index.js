window.onload=function(){
    'use strict';

    this.console.log("hello world");
	var message = {};
    message["id"] = '5ae634368f50d724d642c8ca';
    message["rating"] = '100';
    

	const fetchOptions = {
		method : 'POST',
		headers : {
			'Accept': 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(message)
	};


	var url = "http://localhost:3000/update_rating";
	fetch(url, fetchOptions)
		.then(checkStatus)
		.then(function(responseText) {
            console.log(responseText);
            var jsonFile = JSON.parse(responseText);
			console.log(jsonFile._id);
		})
		.catch(function(error) {
			console.log(error);
   		});
}

// returns the response text if the status is in the 200s
// otherwise rejects the promise with a message including the status
function checkStatus(response) {  
    if (response.status >= 200 && response.status < 300) {  
        return response.text();
    } else if (response.status == 404) {
    	// sends back a different error when we have a 404 than when we have
    	// a different error
    	return Promise.reject(new Error("Sorry, we couldn't find that page")); 
    } else {  
        return Promise.reject(new Error(response.status+": "+response.statusText)); 
    } 
}