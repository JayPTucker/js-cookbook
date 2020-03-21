
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

// GRAB RECIPE LIST COLUMN FROM HTML AND SET TO A VARIABLE
var list = $(".recipe-list");

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

	// EMPTY THE LIST DIV BEFORE EACH SEARCH
	list.empty();

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

			// CREATE DIV FOR CARD AND SET TO VARIABLE. ADD CLASSES TO GIVE MATERIALIZE CSS CHARACTERISTICS
			var card = $("<div>").addClass("card horizontal");

			// CREATE DIV FOR APPENDING IMG AND ADD CLASSES TO GIVE MATERIALIZE CSS
			var imgDiv = $("<div>").addClass("card-image waves-effect waves-block waves-light");

			// CREATE IMG TAG FOR PHOTO OF EACH CORRESPONDING RECIPE
			var imgTag = $("<img>").addClass("activator").attr("src", img);

			// CREATE DIV FOR STACKING CONTENT
			var stackDiv = $("<div>").addClass("card-stacked");

			// CREATE CONTENT DIV FOR THE RECIPE CARD
			var contentDiv = $("<div>").addClass("card-content");

			// CREATE SPAN TAG FOR ADDING MATERIALIZE CSS TO CONTENT
			var spanTag = $("<span>").addClass("card-title activator grey-text text-darken-4").text(title);

			// CREATE DIV TAG AND a TAG FOR LINK
			var clickDiv = $("<div>").addClass("card-action");
			var aTag = $("<a>").attr("href", "#").text("Click for Recipe");

			// CREATE REVEAL INFO DIV 
			var revealDiv = $("<div>").addClass("card-reveal");

			// CREATE SPAN TAG FOR ADDING MATERIALIZE CSS TO REVEAL CONTENT
			var spanTag2 = $("<span>").addClass("card-title grey-text text-darken-4").text(title);

			// CREATE i TAG FOR ADDING MATERIALIZE ICON
			var iTag2 = $("<i>").addClass("material-icons right").text("close");

			// CREATE p TAG FOR REVEAL DIV
			var pTag2 = $("<p>").html(info);

			// APPEND IMG TO IMGDIV, SPAN AND P TAG TO CONTENT DIV, SPAN AND P TAG TO REVEAL DIV
			imgDiv.append(imgTag);
			clickDiv.append(aTag);
			contentDiv.append(spanTag, clickDiv);
			spanTag2.append(iTag2);
			revealDiv.append(spanTag2, pTag2);

			// APPEND CONTENT DIV TO STACK DIV
			stackDiv.append(contentDiv);

			// APPEND IMGDIV, STACK DIV, AND REVEAL DIV TO CARD DIV
			card.append(imgDiv, stackDiv, revealDiv);

			// APPEND CARD TO LIST
			list.append(card);


		});

	};

};
