(function() {

	"use strict";

	window.onload = function() {
		document.getElementById('submit').onclick = submit;
	};
	

	function submit() {
		// resets the page on every click on search button

		var name = document.getElementById('title').value;
		var comment = document.getElementById('comment').value;
		var category = document.getElementById('category').value;

		const data = {};
		data["title"] = name;
		data["post"] = comment;
		data["category"] = category;



		const fetchOptions = {
		method : 'POST',
		headers : {
			'Accept': 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(data)
		};


		var url = "http://localhost:3000";


		// This fetch gets the total number of voters and prints it
		fetch(url, fetchOptions)
			.then(checkStatus)
			.then(function(responseText) {
				console.log(responseText);
				document.getElementById("success").innerHTML = "Comment posted successfully";
				window.location.href = "view.html"				
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
        } else {  
            return Promise.reject(new Error(response.status+": "+response.statusText)); 
        } 
    }






})();