(function() {

	"use strict";

	window.onload = function() {
		document.getElementById('recentpost').onclick = recent;

	};
	

	function recent() {
		// resets the page on every click on search button
		var result = document.getElementById('result');
		result = '';


		var url = "http://localhost:3000/update/recent";


		// This fetch gets the total number of voters and prints it
		fetch(url)
			.then(checkStatus)
			.then(function(responseText) {
				console.log(responseText);
				//document.getElementById("result").innerHTML = responseText;

				var data = JSON.parse(responseText);
				for (var i = 0; i < data.length; i++) {
					var wholeCont = document.createElement('div');
					var rec = document.getElementById("result");
					var title_div =document.createElement("div");
					var br =document.createElement("br");
					title_div.classname = "titlediv"
					var post_div =document.createElement("div");
					post_div.classname = "postdiv"


					rec.classname = "result";
					var title = data[i].title;
					var rating = data[i].rating;
					var post = data[i].post;
					//console.log(data[i].title);
					//console.log(typeof comment)
					var title_content = document.createTextNode("Title: "+ title + " Rating: " + rating);
					var post_content = document.createTextNode("Post: " + post.substr(0, 40));
					//var text = "Title: "+ title + "\n Post: " + post.substr(0, 40) + "\nRating: " + rating + "\n";


					wholeCont.appendChild(title_content);
					wholeCont.appendChild(post_content);
					wholeCont.id = data[i]._id;

					//title_div.onclick = clickTitle;

					//console.log(text);
					//var content = document.createTextNode(text);
					title_div.appendChild(title_content);
					post_div.appendChild(post_content);
					wholeCont.appendChild(title_div);
					wholeCont.appendChild(post_div)
					// rec.appendChild(title_div);
					// rec.appendChild(post_div);
					rec.appendChild(wholeCont);
					rec.appendChild(br);
					wholeCont.onclick = clickTitle;

				}
							
			})
			.catch(function(error) {
				console.log(error);
   		});
				
	}

	function clickTitle(){
		var id = this.id;
		console.log(this.id);
		console.log()
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