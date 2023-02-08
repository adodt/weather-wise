var apiKey = "0c8dcf810ad08707d092e05436d4c4c0";
var city= '';
var searchCity = $('#city-input');
var searchButton = $('#search-button');
var currentCity = $('current-city');
var currentTemperature = $('temperature');
var currentHumidity = $('#humidity');
var currentWind = $('#wind-speed');
var sCity = [];

function find(c) {
    for (var i=0; i < sCity.length; i++) {
        if (c.toUpperCase () === sCity[i]) {
            return -1;
        }
    }
    return 1;
}

function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== '') {
        city = searchCity.val().trim();
        currentWeather(city);
    }
}

//Today forecast
function currentWeather(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + apiKey;
    $.ajax({
        url: apiUrl,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
        var weathericon = response.weather[0].icon;
        var iconurl = 'https://openweathermap.org/img/wn/' + weathericon + '@2x.png';
        var date = new Date(response.dt * 1000).toLocaleDateString();
        $(currentCity).html(response.name + '' + '(' + date + ')' + '<img src=' + iconurl + '>');
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    })
}