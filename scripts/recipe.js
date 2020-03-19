// AJAX CALL FOR GETTING THE RECIPE ID

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=biscuits%252C%20cinnamon%252C%20sugar",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "8cf712f16dmsh2a112cebaf69ed6p1d6b2djsn121e0beeafed"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});


// AJAX CALL FOR GETTING THE RECIPE INFO BY THE ID

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/1036801/information",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
		"x-rapidapi-key": "8cf712f16dmsh2a112cebaf69ed6p1d6b2djsn121e0beeafed"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);


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