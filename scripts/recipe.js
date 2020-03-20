
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

		var userInput = (searchInput.val().trim().toLowerCase()) + "%252C";
		inputArray.push(userInput);

		console.log(userInput);
		console.log(inputArray);
	};

	firstCall();

});

addBtn.on("click", function(e) {

	e.preventDefault();

	var newInput = $("<input>");

	newInput.attr("id", "search-" + (searchNum++));

	numArray.push("#search-" + (startNum++));

	inputBox.append(newInput);
	
});

// AJAX CALL FOR GETTING THE RECIPE ID

function firstCall() {

	for (var i = 0; i < inputArray.length; i++) {

		var ingredient = inputArray[i];

		console.log(ingredient);

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + ingredient, //%252C between every word
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"x-rapidapi-key": "8cf712f16dmsh2a112cebaf69ed6p1d6b2djsn121e0beeafed"
			}
		};

	};

	$.ajax(settings).done(function (response) {
		

		for (var i = 0; i < 10; i++) {

			var id = response[i].id;
			idArray.push(id);

		};

		secondCall();

	});

};

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
		};

		$.ajax(settings).done(function (response) {

			// GRAB TITLE OF SELECTED DISH
			var title = response.title;

			// GRAB PICTURE OF SELECTED DISH
			var img = response.image;

			// GRAB DESCRIPTION OF SELECTED DISH
			var info = response.summary;

			// GRAB INGREDIENTS OF SELECTED DISH
			for ( var i = 0; i < response.extendedIngredients.length; i++) {

			var ingredients = response.extendedIngredients[i].originalString;

			};

			// GRAB COOKING INSTRUCTIONS OF SELECTED DISH
			var instructions = response.instructions;

		});

	};

};

// Sample div layout for potential cards holding each dish option

{/* <div class="card horizontal">
    <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="https://spoonacular.com/recipeImages/933310-556x370.jpg">
    </div>
    <div class="card-content">
		<span class="card-title activator grey-text text-darken-4">Apple Tart<i class="material-icons right">Click for info</i></span>
		<p><a href="#">Click for recipe</a></p>
    </div>
    <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
        <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
</div> */}