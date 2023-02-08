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

        $(currentTemperature).htmk(" " + (tempF).toFixed(2) +' '+"&#8457");
        $(currentHumidity).html(' ' + response.main.humidity + ' '+ "%");
        var ws = response.wind.speed;
        var windsmph = (ws * 2.237).toFixed(1);
        $(currentWind).html(" " + windsmph + " " + "MPH");

        forecast(response.id);
        if (response.cod == 200) {
            sCity = JSON.parse(localStorage.getItem('cityname'));
            console.log(sCity);
            if (sCity == null) {
                sCity = [];
                sCity.push(city.toUppderCase()
                );
                localStorage.setItem('cityname', JSON.stringify(sCity));
                addToList(city);
            }
            else {
                if (find(city) > 0) {
                    sCity.push(city.toUpperCase());
                    localStorage.setItem('cityname', JSON.stringify(sCity));
                    addToList(city);
                }
            }
        }
    });
}

//FIVE DAY FORECAST
function forecast(cityid) {
    var fiveUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=' + apiKey;
    $.ajax({
        url: fiveUrl,
        method: 'GET'
    }).then(function (response) {
        for (i = 0; i < 5; i++) {
            var date = new Date ((response.list[((i * 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            var iconcode = response.list[((i * 1) * 8) - 1].weather[0].icon;
            var iconurl = 'https://openweathermap.org/img/wm/' + iconcode + '.png';
            var tempK = response.list[((i * 1) * 8) -1].main.temp;
            var tempF = (((tempK - 273.5) * 1.80) + 32).toFixed(2);
            var humidity = response.list[((i + 1) * 8) - 1].main.humidity;

            $('#Date' + 1).html(date);
            $('#Img' + i).html('<img src=' + iconurl + '>');
            $('#Temp' + i).html(' ' + tempF + ' &#8457');
            $('#Humidity' + i).html(' ' + humidity + ' %');
        
        }
    });
}

function addToList(c) {
    var listEl = $('<li>' + c.toUppderCase() + '</li>');
    $(listEl).attr('class', 'list-group-item');
    $(listEl).attr('data-value', c.toUpperCase());
    $('.list-group').append(listel);
}

function invokePastSearch(event) {
    var liEl = event.target;
    if (event.target.matches('li')) {
        city =liEl.textContent.trim();
        currentWeather(city);
    }
}

