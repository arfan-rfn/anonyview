// Rubbal Kumar and Md Arfan Uddin
// CSC 337, Spring 2018
// Section 2

// This program starts the javascript for the anonyview.html that
// sends the post request which includes the title, category and the comment

(function() {

	"use strict";

	window.onload = function() {
		document.getElementById('submit').onclick = submit;
	};
	
	// This functions posts the title, category and the anonymous comment
	// to the mongodb database
	function submit() {
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


		// This fetch redirects the use to the view.html page 
		// which conatins all the anonymous comments 
		fetch(url, fetchOptions)
			.then(checkStatus)
			.then(function(responseText) {
				console.log(responseText);
				document.getElementById("success").innerHTML += "Comment posted successfully";
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