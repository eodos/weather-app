let temperature;
let units = "°C";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getForecast);
  }
}

function getForecast(position) {
  let lat = position.coords.latitude.toFixed(4);
  let lon = position.coords.longitude.toFixed(4);

  let ApiKey = "5a74170b03364ff49c7f0d97693713a7";
  let query = "https://api.weatherbit.io/v1.0/current?lat=" + lat + "&lon=" + lon + "&key=" + ApiKey;

  axios.get(query).then(response => {
    let data = response.data.data[0];
    console.log(data);

    let city = data.city_name;
    let state = data.state_code;
    temperature = data.temp.toFixed(1);
    let description = data.weather.description;
    let icon = data.weather.icon;

    document.getElementById("title").innerHTML = "Weather in ... <br/>" + city + ", " + state;
    document.getElementById("description").innerHTML = description;
    document.getElementById("temperature").innerHTML = temperature + units;

    let skycons = new Skycons({ color: "black" });
    skycons.add("icon", getSkyconsCode(icon));
    skycons.play();
  });
}

function getSkyconsCode(icon) {
  switch (icon) {
    case "c01d":
      return "clear-day";
    case "c01n":
      return "clear-night";
    case "c02d":
    case "c03d":
      return "partly-cloudy-day";
    case "c02n":
    case "c03n":
      return "partly-cloudy-night";
    case "c04d":
    case "c04n":
      return "cloudy";
    case "s05d":
    case "s05n":
      return "sleet";
  }

  if (icon[0] == "a") {
    return "fog";
  }

  if (icon[0] == "s") {
    return "snow";
  }

  if (icon[0] == "d" || icon[0] == "r" || icon[0] == "f" || icon[0] == "u" || icon[0] == "t") {
    return "rain";
  }
}

function toggleUnits() {
  if (units == "°F") {
    units = "°C";
    document.getElementById("temperature").innerHTML = temperature + units;
  } else {
    units = "°F";
    document.getElementById("temperature").innerHTML = (temperature * 9 / 5 + 32).toFixed(1) + units;
  }
}

$(document).ready(function () {
  getLocation();
  $("#units").click(toggleUnits);
});