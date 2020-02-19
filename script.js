var searchForm = $("#searchForm");
var searchInput = $(".searchInput");
var searchSubmit = $("#searchSubmit");
// var searchSubmit = $("#searchSubmit");
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



    //API cal to alphaavantage
    // var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=4EOJKMRS4JOT2AEA";
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    // });

    // //API call to symbol lookup
    // var symbolQueryURL = "https://financialmodelingprep.com/api/v3/search?query=microsoft&limit=10";
    // $.ajax({
    //     url: symbolQueryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    // });


function generateStockInfo(){
    console.log(response);
<<<<<<< Updated upstream
    




=======
>>>>>>> Stashed changes
}

// function generateStockNews(){


// }

<<<<<<< Updated upstream
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
=======
searchForm.on("submit", function(event){
    event.preventDefault();
    searchTerm = searchInput.val();
    console.log(searchTerm);
    getStockQuery();
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    //     generateStockInfo(response);
    // });

    // generateStockInfo();
    // generateStockNews();
>>>>>>> Stashed changes

});

