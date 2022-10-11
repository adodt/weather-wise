var current = moment();
var searchBar = document.querySelector("input");
var apiKey = "0c8dcf810ad08707d092e05436d4c4c0";
var apiUrl = "https://api.openweathermap.org";
var recentSearch = [];
var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton")



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

function cityInfo (cityData) {
    var lat = cityData.lat;
    var lon = cityData.lon;
    var city = cityData.name;

    var url = `${apiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;

    fetch(url)
    .then(function (res){
        return res.json();
    })
    .then(function (data){
        drawTodayCard(city, data.current, data.timezone);
        drawFiveDay(data.dail, data.timezone);
    })
    .catch(function (err){
        console.error(err);
    });
};







//adds current date to header
$("#currentDate").text(current.format('MMMM Do YYYY, h:mm a'))
//runs getCity upon search click
$("#searchButton").on("click", getCity)