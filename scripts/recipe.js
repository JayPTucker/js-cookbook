
// ARRAY TO HOLD THE 10 GRABBED IDS FROM FIRST API CALL

var idArray    = [];

// ARRAY FOR USER INPUT VALUES

// var inputArray = [];
var userInput  = "";

// VARIABLES FOR NAMING THE ID OF EACH NEWLY CREATED INPUT TAGS SEQUENTIALLY

var searchNum  = 1;

var startNum   = 1;

// ARRAY FOR HOLDING THE ID VALUE OF EACH INPUT TAG ON THE PAGE

// var numArray   = ["#search-0"];

// GRAB INPUT BOX AND BUTTONS FOR FINDING RECIPES

var searchBtn   = $("#search-btn");

var inputBox    = $("#input-box");

// var addBtn      = $("#add");

// GRAB RECIPE LIST COLUMN FROM HTML AND SET TO A VARIABLE
var list = $(".recipe-list");

// ADD EVENT LISTENERS

// addBtn.on("click", function(e) {

// 	e.preventDefault();

// 	var newInput = $("<input>");

// 	newInput.attr("id", "search-" + (searchNum++));

// 	numArray.push("#search-" + (startNum++));

// 	inputBox.append(newInput);
	
// });

searchBtn.on("click", function(e) {

	// EMPTY ARRAY BEFORE EACH NEW SEARCH
	inputArray = [];

	e.preventDefault();

	// FOR LOOP THROUGH EACH APPENDED INGREDIENT DIV AND SET TO USER INPUT VARIABLE
	// for (var i = 0; i < numArray.length; i++) {

		var searchInput = $("#search-0");

		// PUSH TO INPUT ARRAY
		var newInput = (searchInput.val().trim().toLowerCase());

			if (newInput !== "") {
				userInput = newInput;
			};
	// };

	firstCall();

});

// AJAX CALL FOR GETTING THE RECIPE ID

function firstCall() {


	var ingredients = userInput;

	console.log(ingredients);

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" + ingredients, //%252C between every word
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
				"x-rapidapi-key": "8cf712f16dmsh2a112cebaf69ed6p1d6b2djsn121e0beeafed"
			}
		};

	$.ajax(settings).done(function (response) {
		
		// EMPTY ID ARRAY BEFORE SECOND CALL
		idArray = [];

		// FOR LOOP THROUGH ALL ID NUMBERS AND PUT ALL 10 INTO ID ARRAY
		for (var i = 0; i < 10; i++) {

			// // IF STATEMENT TO STOP FROM REPEATED RECIPE OF THIS DISH (SHOWS UP TOO MANY TIMES)
			// if (response[i].title !== "Sugared Cranberries") {

			// PUSH TO ID ARRAY
			var id = response[i].id;
			idArray.push(id);

			// };

		};

		secondCall();

	});

};

// AJAX CALL FOR GETTING THE RECIPE INFO BY THE ID
function secondCall() {

	// EMPTY THE LIST DIV BEFORE EACH SEARCH
	list.empty();

	// FOR LOOP THROUGH ID ARRAY AND PUT EACH SEARCHED RECIPE INFO ON THE PAGE
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
			var card = $("<div>").addClass("card small horizontal");

			// CREATE DIV FOR APPENDING IMG AND ADD CLASSES TO GIVE MATERIALIZE CSS
			var imgDiv = $("<div>").addClass("card-image waves-effect waves-block waves-light");

			// CREATE IMG TAG FOR PHOTO OF EACH CORRESPONDING RECIPE
			var imgTag = $("<img>").addClass("activator recipeImg").attr("src", img);

			// CREATE DIV FOR STACKING CONTENT
			var stackDiv = $("<div>").addClass("card-stacked");

			// CREATE CONTENT DIV FOR THE RECIPE CARD
			var contentDiv = $("<div>").addClass("card-content");

			// CREATE SPAN TAG FOR ADDING MATERIALIZE CSS TO CONTENT
			var spanTag = $("<span>").addClass("card-title activator grey-text text-darken-4").text(title);

			// CREATE DIV TAG AND a TAG FOR LINK
			var clickDiv = $("<div>").addClass("card-action");
			var aTag = $("<a>").addClass("waves-effect waves-teal btn-flat").text("Click for Recipe");

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

// APPEND NEW CARD WITH RECIPE INFO, INGREDIENT LIST AND DIRECTION
