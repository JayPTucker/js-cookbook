
// ARRAY TO HOLD THE 10 GRABBED IDS FROM FIRST API CALL

var idArray    = [];

// VARIABLE FOR USER INPUT

var userInput  = "";

// VARIABLES FOR NAMING THE ID OF EACH NEWLY CREATED INPUT TAGS SEQUENTIALLY

var searchNum  = 1;

var startNum   = 1;

// GRAB INPUT BOX AND BUTTONS FOR FINDING RECIPES

var searchBtn   = $("#search-btn");

var inputBox    = $("#input-box");

// GRAB RECIPE LIST COLUMN FROM HTML AND SET TO A VARIABLE
var list = $(".recipe-list");

searchBtn.on("click", function(e) {

	// EMPTY ARRAY BEFORE EACH NEW SEARCH
	inputArray = [];

	e.preventDefault();

		var searchInput = $("#search-0");

		// PUSH TO INPUT ARRAY
		var newInput = (searchInput.val().trim().toLowerCase());

			if (newInput !== "") {
				userInput = newInput;
			};

	firstCall();

});

// AJAX CALL FOR GETTING THE RECIPE ID

function firstCall() {


	var ingredients = userInput;

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

			// PUSH TO ID ARRAY
			var id = response[i].id;
			idArray.push(id);

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
			var ingredArray = [];
			for ( var i = 0; i < response.extendedIngredients.length; i++) {

			var ingredients = response.extendedIngredients[i].originalString;
			ingredArray.push("• " + ingredients +"<br>");

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
			var aTag = $("<a>").addClass("waves-effect waves-light btn modal-trigger").attr("href", "#" + response.id).text("Click for Summary");

			// CREATE REVEAL INFO DIV 
			var revealDiv = $("<div>").addClass("card-reveal");

			// CREATE SPAN TAG FOR ADDING MATERIALIZE CSS TO REVEAL CONTENT
			var spanTag2 = $("<p>").addClass("card-title grey-text text-darken-4 col l6").html(ingredArray);

			// CREATE p TAG FOR REVEAL DIV
			var pTag2 = $("<p>").addClass("col l6").text(instructions);

			// CREATE MODAL STRUCTURE
			var modalDiv = $("<div>").attr("id", response.id).addClass("modal");

			var modalContent = $("<div>").addClass("modal-content");
			var h4 = $("<h4>").text(title);
			var pModal = $("<p>").html(info);

			var footer = $("<div>").addClass("modal-footer");
			var close = $("<a>").addClass("modal-close waves-effect waves-green btn-flat").attr("href", "#!").text("Close");

			// APPEND MODAL CONTENT
			modalContent.append(h4, pModal);

			footer.append(close);

			modalDiv.append(modalContent, footer);

			$(".modal-append").append(modalDiv);

			$(document).ready(function(){
				$('.modal').modal();
			  });

			// APPEND IMG TO IMGDIV, SPAN AND P TAG TO CONTENT DIV, SPAN AND P TAG TO REVEAL DIV
			imgDiv.append(imgTag);
			clickDiv.append(aTag);
			contentDiv.append(spanTag, clickDiv);
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


