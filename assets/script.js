var current = moment();
var searchBar = document.querySelector("input")
var apiKey = "0c8dcf810ad08707d092e05436d4c4c0"






//adds current date to header
$("#currentDate").text(current.format('MMMM Do YYYY, h:mm a'))
//runs getCity upon search click
$("#searchButton").on("click", getCity)