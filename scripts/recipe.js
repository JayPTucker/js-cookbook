
// Array to hold the 10 grabbed ids from first api call

var idArray    = [];

// Array for user input values

var inputArray = [];

// Variables for naming the id of each newly created input tags sequentially

var searchNum  = 1;

var startNum   = 1;

// Array for holding the id value of each input tag on the page

var numArray   = ["#search-0"];


// Grab input box and button for finding recipes


var searchBtn   = $("#search-btn");

var inputBox    = $("#input-box");

var addBtn      = $("#add");

// Add event listeners

searchBtn.on("click", function(e) {

	e.preventDefault();

	for (var i = 0; i < numArray.length; i++) {

		var searchInput = $(numArray[i]);

		var userInput = searchInput.val().trim().toLowerCase();
		inputArray.push(userInput);

		console.log(userInput);
		console.log(inputArray);
	};

});

addBtn.on("click", function(e) {

	e.preventDefault();

	var newInput = $("<input>");

	newInput.attr("id", "search-" + (searchNum++));

	numArray.push("#search-" + (startNum++));

	inputBox.append(newInput);
	
})



// 



// AJAX CALL FOR GETTING THE RECIPE ID

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=biscuits%252C%20bananas%252C%20cinnamon", //%252C%20 between every word
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "8cf712f16dmsh2a112cebaf69ed6p1d6b2djsn121e0beeafed"
	}
};

$.ajax(settings).done(function (response) {
	

	for (var i = 0; i < 10; i++) {

		var id = response[i].id;
		idArray.push(id);

	};

	secondCall();

});

// AJAX CALL FOR GETTING THE RECIPE INFO BY THE ID
function secondCall() {

	for (var i = 0; i < idArray.length; i++) {

		var idNum = idArray[i];

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+ idNum + "/information",
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"x-rapidapi-key": "8cf712f16dmsh2a112cebaf69ed6p1d6b2djsn121e0beeafed"
			}
		}

		$.ajax(settings).done(function (response) {

			// GRAB TITLE OF SELECTED DISH
			console.log(response.title);

			// GRAB PICTURE OF SELECTED DISH
			console.log(response.image);

			// GRAB DESCRIPTION OF SELECTED DISH
			console.log(response.summary);

			// GRAB INGREDIENTS OF SELECTED DISH
			for ( var i = 0; i < response.extendedIngredients.length; i++) {

			console.log(response.extendedIngredients[i].originalString);

			};

			// GRAB COOKING INSTRUCTIONS OF SELECTED DISH
			console.log(response.instructions);


		});

	};

};