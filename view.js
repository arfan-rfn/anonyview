// Rubbal Kumar and Md Arfan Uddin
// CSC 337, Spring 2018
// Section 2

// This program starts the javascript for the view.html that
// shows all the comments according to date, category, etc.

(function() {

	"use strict";

	var ID = null;

	window.onload = function() {
		var x = document.getElementById("req");
		x.style.display = "none";
		document.getElementById('recentpost').onclick = recent;
		document.getElementById('toppost').onclick = toppost;
		document.getElementById('food').onclick = food;
		document.getElementById('film').onclick = film;
		document.getElementById('current').onclick = current;
		document.getElementById('tech').onclick = tech;
	};
	
	// setting the urls according to the request

	function recent() {
		var url = "http://localhost:3000/update/recent";
		requestToServer(url);
				
	}

	function toppost() {
		var url = "http://localhost:3000/update/all";
		requestToServer(url);
				
	}

	function food() {
		var url = "http://localhost:3000/update/cat/food";
		requestToServer(url);
				
	}

	function film() {
		var url = "http://localhost:3000/update/cat/film";
		requestToServer(url);
				
	}

	function current() {
		var url = "http://localhost:3000/update/cat/current";
		requestToServer(url);
				
	}

	function tech() {
		var url = "http://localhost:3000/update/cat/tech";
		requestToServer(url);
				
	}

	// This function sends the fetch request to the server which gets the
	// data from node.js and adds it to the html page according to
	// the specified category
	function requestToServer(url){
		// resets the page on every click on search button
		var result = document.getElementById('result');
		result.innerHTML = '';
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
					
					var title_content = document.createTextNode("Title: "+ title + " Rating: " + rating);
					var post_content = document.createTextNode("Post: " + post.substr(0, 40));
					
					wholeCont.appendChild(title_content);
					wholeCont.appendChild(post_content);
					wholeCont.id = data[i]._id;

					title_div.appendChild(title_content);
					post_div.appendChild(post_content);
					wholeCont.appendChild(title_div);
					wholeCont.appendChild(post_div)

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
		var url = "http://localhost:3000/post/"+id;
		console.log(this.id);
		fetch(url)
			.then(checkStatus)
			.then(function(responseText) {
				console.log(responseText);
				//document.getElementById("result").innerHTML = responseText;

				var data = JSON.parse(responseText);
				console.log(data);
				var x = document.getElementById("all_con");
				x.style.display = "none";
				var request = document.getElementById("req");
				request.style.display = "block";

				var home = document.createElement('BUTTON');
				var home_name = document.createTextNode("Home");
				home.appendChild(home_name);
				request.appendChild(home);
				home.onclick = show;

				var title_div = document.createElement('h2');
				var title = document.createTextNode(data.title);
				title_div.appendChild(title);
				request.appendChild(title_div);

				var rating_div = document.createElement('h3');
				var rating = document.createTextNode("Rating: "+data.rating);
				rating_div.appendChild(rating);
				request.appendChild(rating_div);

				// Creates the rating buttons
				for (var i  = 1; i < 6; i++) {
					var rate_button = document.createElement('BUTTON');
					var rate = document.createTextNode(i);
					rate_button.appendChild(rate);
					rate_button.id=i;

					rate_button.onclick = rateing;
					req.appendChild(rate_button);

				}

				var post_div = document.createElement('h4');
				var post = document.createTextNode(data.post);
				post_div.appendChild(post);
				request.appendChild(post_div);

				var comment_div = document.createElement('textarea');
				request.appendChild(comment_div);
				comment_div.id = "comment";
				var comment = document.getElementById('comment').value;


				var comment_button = document.createElement('BUTTON');
				var comment_button1 = document.createTextNode("Comment");
				comment_button.appendChild(comment_button1);
				request.appendChild(comment_button);

				ID = data._id;
				comment_button.onclick = function() {post_comment(data._id, document.getElementById('comment').value)};


				var prev_cmnt = document.createElement('h5');
				for (var i = 0; i < data.comment.length; i++) {
					console.log()
					var break_ = document.createElement("br")
					var cmnt_text = document.createTextNode(data.comment[i]);
					prev_cmnt.appendChild(cmnt_text);
					prev_cmnt.appendChild(break_);
					request.appendChild(prev_cmnt);

				}
							
			})
			.catch(function(error) {
				console.log(error);
   		});
		console.log()
	}

	// This function updates the ratings of the post everytime user 
	// hits the rating buttons
	function rateing(){

		console.log(ID);
		const data = {};
		data["id"] = ID;
		data["rating"] = this.id;



		const fetchOptions = {
		method : 'POST',
		headers : {
			'Accept': 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(data)
		};

		var url = "http://localhost:3000/update_rating";

		// This fetch post the total number of votes the post has got
		fetch(url, fetchOptions)
			.then(checkStatus)
			.then(function(responseText) {
				console.log(responseText);			
			})
			.catch(function(error) {
				console.log(error);
   		});
	
	}

	// A helper function to show and hide different divs
	function show() {
		var x = document.getElementById("all_con");
		x.style.display = "block";
		var request = document.getElementById("req");
		request.style.display = "none";
		request.innerHTML = '';
	}

	// This function posts the comment to the anonymous post 
	function post_comment(_id, _comment) {
		//alert(_comment);
		console.log(_id, _comment);
		const data = {};
		data["id"] = _id;
		data["comment"] = _comment;



		const fetchOptions = {
		method : 'POST',
		headers : {
			'Accept': 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(data)
		};

		var url = "http://localhost:3000/update_comment";

		// This fetch gets the total number of voters and prints it
		fetch(url, fetchOptions)
			.then(checkStatus)
			.then(function(responseText) {
				console.log(responseText);
				//document.getElementById("req").innerHTML = "Comment posted successfully";
				//window.location.href = "view.html"				
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