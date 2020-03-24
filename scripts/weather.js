// Grabs current location:
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else { 
    console.log("Weather Location Acess Denied")
}

// Function if the user denies access to said location:
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.")
      break;
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude =  position.coords.longitude;
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=e8bec4199b95f357f589f6ba4bdcd7c3"

  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response) {

      var weatherDiv = $(".weatherDiv");
      weatherDiv.text("");

      //Icon:
      var iconID = response.weather[0].icon;
      var iconURL = "http://openweathermap.org/img/w/" + iconID + ".png";
      var printIcon = $("<img>").attr("src", iconURL);
      weatherDiv.append(printIcon);

      var currentTemp = ((response.main.temp) * (9/5) - 459.67).toFixed(2);
      var printCT = $("<p class='weatherText'>").text(currentTemp + " °F");
      weatherDiv.append(printCT);

      $(".weatherDiv").append(weatherDiv);
  })
}