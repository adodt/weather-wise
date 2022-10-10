var current = moment();
var searchBar = document.querySelector("input");
var apiKey = "0c8dcf810ad08707d092e05436d4c4c0";
var apiUrl = "https://api.openweathermap.org";

//Draws current day weather data

function weatherToday (city, weather, time){
    let date = moment().format('dddd');
    let todayDate = document.getElementById("todayDate");
    let todayIcon = document.getElementById("todayIcon");
    let todayTemp = document.getElementById("todayTemp");
    let todayWind = document.getElementById("todayWind");
    let todayHumid = document.getElementById("todayHumid");
    let weatherIcon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
}



//adds current date to header
$("#currentDate").text(current.format('MMMM Do YYYY, h:mm a'))
//runs getCity upon search click
$("#searchButton").on("click", getCity)