var input = "chicken"
var settings = {
"async": true,
"crossDomain": true,
"url": "https://webknox-recipes.p.rapidapi.com/recipes/search?query=burger",
"method": "GET",
"headers": {
    "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
    "x-rapidapi-key": "8cf712f16dmsh2a112cebaf69ed6p1d6b2djsn121e0beeafed"
}
}

$.ajax(settings).done(function (response) {
console.log(response);
});