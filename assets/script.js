var moment = moment();
var searchBar = document.querySelector("input")






$("#currentDate").text(moment.format('MMMM Do YYYY, h:mm a'))
$("#searchButton").on("click", getCity)