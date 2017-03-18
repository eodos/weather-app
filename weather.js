var temperature;
var units = "°F";
var temperatureDiv;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  var lat = position.coords.latitude.toFixed(4);
  var lon = position.coords.longitude.toFixed(4);
 
  var cityRequest = "https://api.weather.gov/points/" + lat + "," + lon;
  var weatherRequest = "https://api.weather.gov/points/" + lat + "," + lon + "/forecast/hourly";
  
  $.getJSON(cityRequest, function(data) {
    var city = data.properties.relativeLocation.properties.city;
    var cityDiv = document.getElementById("title");
    cityDiv.innerHTML = "Weather in ... " + city;
  });
  
  $.getJSON(weatherRequest, function(data) {
    temperature = data.properties.periods[0].temperature;
    var code = data.properties.periods[0].icon.replace(/small/i, "large");
    $("#icon").attr("src", code);
    temperatureDiv.innerHTML = temperature + units;
  });
}

function toggleUnits() {
  if (units == "°F") {
    units = "°C";
    temperatureDiv.innerHTML = ((temperature - 32) * 5/9).toFixed(0) + units;
  }
  else {
    units = "°F";
    temperatureDiv.innerHTML = temperature + units;
  }
}

$( document ).ready(function() {
  temperatureDiv = document.getElementById("temperature");
  getLocation();
  $("#units").click(toggleUnits);
});