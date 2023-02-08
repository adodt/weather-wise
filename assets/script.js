var apiKey = "0c8dcf810ad08707d092e05436d4c4c0";
var city= '';
var searchCity = $('#city-input');
var searchButton = $('#search-button');
var currentCity = $('current-city');
var currentTemperature = $('temperature');
var currentHumidity = $('#humidity');
var currentWind = $('#wind-speed');
var sCity = [];


//Draws current day weather data

function weatherToday(city, weather, time) {
    let date = moment(time).format('dddd');
    let currentDate = document.getElementById("todayDate");
    let todayIcon = document.getElementById("todayIcon");
    let todayTemp = document.getElementById("todayTemp");
    let todayWind = document.getElementById("todayWind");
    let todayHumid = document.getElementById("todayHumid");
    let weatherIcon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

    todayCity.textContent = city;
    currentDate.textContent = date;
    todayIcon.setAttribute("src", weatherIcon);
    todayTemp.textContent = weather.temp;
    todayWind.textContent = weather.wind_speed;
    todayHumid.textContent - weather.humidity;

    //testing output. delete later
    console.log(city);
    console.log(date);
    console.log(weather.temp);
    console.log(weather.wind_speed);
};

//Draws forecast into forecast cards

function futureWeather(daily, time) {
    const dayOne = dayjs().tz(time).add(1, "day").startOf("day").unix();
    const dayFive = day.js().tz(time).add(6, "day").unix();


    for (var i = 0; i < daily.length; i++) {
        if (daily[i].dt >= day1 && daily[i].dt < day5) {
            var tStamp = daily[i].dt;
            let day = dayjs.unix(tStamp).tz(time).format("MMM D");
            let date = document.getElementById(`day${i}`);
            let dayIcon = document.getElementById(`day${i}Icon`);
            let dayTemp = document.getElementById(`day${i}Temp`);
            let dayWind = document.getElementById(`day${i}Wind`);
            let dayHum = document.getElementById(`day${i}Hum`);

            let weatherIcon = `https://openweathermap.org/img/w/${daily[i].weather[0].icon}.png`;

            date.textContent = day;
            dayIcon.setAttribute("src", weatherIcon);
            dayTemp.textContent = daily[i].temp.max;
            dayWind.textContent = daily[i].wind_speed;
            dayHum.textContent = daily[i].humidity;

        };
    };
};

//Calling API

function cityInfo(cityData) {
    var lat = cityData.lat;
    var lon = cityData.lon;
    var city = cityData.name;

    var url = `${apiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;

    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            drawTodayCard(city, data.current, data.timezone);
            drawFiveDay(data.dail, data.timezone);
        })
        .catch(function (err) {
            console.error(err);
        });
};


//makes API call using city name aka user search
//passes lat and long

function getLatLon(search) {
    var url = apiUrl + "/geo/1.0/direct?q=" + search + "&limit=5&appid=" + apiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data[0]) {
                alert("location not found");
            } else {
                addHistory(search)
                getCityInfo(data[0]);
                return;
            }
        })
        .catch(function (err) {
            console.log("error: " + err);
        })
    const content = document.getElementById("hiddenCards");
    content.removeAttribute("hiddenCards");
};

//function starts when button is clicked
function citySearch(e){
    if (searchInput.value) {
        return;
    };
    e.preventDefault();
    var search = searchInput.value.trim();
    getLatLon(search);
    searchInput.value = "enter city name";
};

//begin search for lat and lon value using search history buttons instead of input field
function useSearchHistory(e) {
    if (!e.target.matches("button.history")) {
        return;
    }
    var btn = e.target;
    var search = btn.getAttribute("data-search");
    getLatLon(search);
};





//adds current date to header
$("#currentDate").text(current.format('MMMM Do YYYY, h:mm a'))
//createHistory();
//searchInput.onclick = citySearch;
searchButton.addEventListener("click", useSearchHistory)