var searchForm = $("#searchForm");
var searchInput = $(".searchInput");
var searchSubmit = $("#searchSubmit");
var searchTerm = '';
var newsDiv = $("#newsDiv");
var searchSymbol = '';

var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + searchSymbol + "&interval=5min&apikey=4EOJKMRS4JOT2AEA";
   

$.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        generateStockInfo(response);
    });



function generateStockInfo(){
    console.log(response);
    




}

// function generateStockNews(){


// }

searchInput.on("submit", function(event){
    event.preventDefault();
    searchTerm = searchInput.val();
    getStockQuery();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        generateStockInfo(response);
    });

    generateStockInfo();
    generateStockNews();

});

