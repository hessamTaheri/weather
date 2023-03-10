// import axios from '../node_modules/axios'

let cityName = document.querySelector("input");

function Enter(e) {
  if (e.keyCode === 13)
    //   axios({
    //     method: 'get',
    //     url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=d10e019da905839018cb22c5a7b89043`,
    // })
    // .then(function (response) {
    //     console.log(response.data)
    // });
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=d10e019da905839018cb22c5a7b89043`
    )
    .then((response) => response.json())
    .then((data) => {
      let cityTemperature = Math.round(data.main.temp - 273);
      let cityTemperaturefeels = Math.round(data.main.feels_like - 273);
      let citystatus = data.weather[0].main;
      let cityWindDeg = data.wind.deg;
      let cityWindSpeed = data.wind.speed;
      let cityHumidity = data.main.humidity;
      let citytimeZone = data.timezone;
      let cityVisibility = data.visibility / 1000;
      var iconcode = data.weather[0].icon;
      var iconcodeicon = "http://openweathermap.org/img/w/" + iconcode + ".png";
      console.log(iconcode)
      let cityNameShow = (document.getElementById(
        "city"
      ).innerHTML = `${cityName.value}`);

      let cityTemperatureShow = (document.getElementById(
        "temperature"
      ).innerHTML = `${cityTemperature}°C`);

      let cityTemperaturefeelsShow = (document.getElementById(
        "temperaturefeels"
      ).innerHTML = `feels like ${cityTemperaturefeels}°C`);

      let citystatusShow = (document.getElementById(
        "status"
      ).innerHTML = `${citystatus}`);
      let citystatusiconShow = (document.getElementById(
        "wicon"
      ).setAttribute("src", `${iconcodeicon}`))
      let citystatusiconHideToShow = (document.getElementById(
        "icon"
      ).setAttribute("style", ""))

      let cityWindShow = (document.getElementById(
        "wind"
      ).innerHTML = `wind status : ${cityWindSpeed}m/s ${degToCompass(
          cityWindDeg
        )}`);

      let cityHumidityShow = (document.getElementById(
        "humidity"
      ).innerHTML = `humidity : ${cityHumidity}%`);

      let cityTimeZoneShow = (document.getElementById(
        "timezone"
      ).innerHTML = `time zone is ${toTimeString(citytimeZone)}`);

      let cityVisibilityShow = (document.getElementById(
        "visibility"
      ).innerHTML = `visibility : ${cityVisibility} Km`);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city ?";
    });
  // getUser()
  // getData()
  return;
}

cityName.addEventListener("keydown", Enter);


var getData = async () => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=d10e019da905839018cb22c5a7b89043`
  );
  const myJson = await response.data;
  console.log(myJson)
};

async function getUser() {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=d10e019da905839018cb22c5a7b89043`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}


function degToCompass(num) {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
}

function toTimeString(totalSeconds) {
  const totalMs = totalSeconds * 1000;
  const result = new Date(totalMs).toISOString().slice(11, 16);

  return result;
}