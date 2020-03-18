
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else { 
    alert("no");
}


function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude =  position.coords.longitude;
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=e8bec4199b95f357f589f6ba4bdcd7c3"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
})
  console.log(latitude);
  console.log(longitude);
}