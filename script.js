var searchForm = $("#searchForm");
var searchInput = $(".searchInput");
var searchSubmit = $("#searchSubmit");
// var searchSubmit = $("#searchSubmit");
var searchTerm = '';
var stockInfo = $("#stockInfo");
var searchSymbol = '';
var searchTerm = '';
var startYear = null;
var endYear = null;
queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=4EOJKMRS4JOT2AEA";





var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&apikey=4EOJKMRS4JOT2AEA";


function getInfo(){
    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    // return(response);
    console.log(response);
    var newStockName = $("<p>");
    var newStockPrice = $("<p>");
    var newStockHigh = $("<p>");
    var newStockLow = $("<p>");
    var newStockVol = $("<p>");
    newStockName.text(response["Meta Data"]["2. Symbol"]);
    stockInfo.append(newStockName);
    // var lastRefreshed = response["Meta Data"]["Last Refreshed"];
    // console.log(lastRefreshed);
    var firstKey = response["Time Series (Daily)"][Object.keys(response["Time Series (Daily)"])[0]];
    console.log(firstKey);
    newStockPrice.text(firstKey["1. open"]);
    stockInfo.append(newStockPrice);
    newStockHigh.text(firstKey["2. high"]);
    stockInfo.append(newStockHigh);
    newStockLow.text(firstKey["3. low"]);
    stockInfo.append(newStockLow);
    newStockVol.text(firstKey["5. volume"]);
    stockInfo.append(newStockVol);
});

}





searchForm.on("submit", function(event){
    event.preventDefault();
    searchTerm = searchInput.val();
    var symbolQueryURL = "https://financialmodelingprep.com/api/v3/search?query=" + searchTerm + "&limit=10";
    $.ajax({
        url: symbolQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

    newsQueryURL = getNewsQuery();
    search();
    
    // console.log(searchSymbol);
    // queryURL = getQuery();

    // var stockInfo = getInfo();
    // console.log(stockInfo);
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
        
    // });
 
});



// Add Script for portfolio page




// NYT News Search Code






var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=gtGyME9eJStqbpLqVNHQQKExu01uGU0X";


function getNewsQuery() {
    if (startYear !== null && endYear !== null) {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=" + startYear + "0101&end_date=" + endYear + "1231&q=" + searchTerm + "&api-key=gtGyME9eJStqbpLqVNHQQKExu01uGU0X";
    
    }

    else if (startYear === null && endYear !== null) {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=19000101&end_date=" + endYear + "1231&q=" + searchTerm + "&api-key=gtGyME9eJStqbpLqVNHQQKExu01uGU0X";
    }
    else if(startYear !== null && endYear === null) {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=" + startYear + "0101&end_date=20201231&q=" + searchTerm + "&api-key=gtGyME9eJStqbpLqVNHQQKExu01uGU0X";
    }
    else {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=gtGyME9eJStqbpLqVNHQQKExu01uGU0X";

    }
    return queryURL;
}

function search(){
    $.ajax({
        url: newsQueryURL,
        method : "GET"
    }).then(function(response){
        console.log(response)
        // for(i = 0; i < articleNum; i++) {
        //     let div = document.createElement("div");
        //     let headline = document.createElement("p");
        //     headline.textContent = response.response.docs[i].headline.main;
        //     let datePub = document.createElement("p");
        //     let pubDate = response.response.docs[i].pub_date;
        //     datePub.textContent = "Released: " + pubDate.substring(0, 9);
        //     let author = document.createElement("p");
        //     let name = response.response.docs[i].byline.original;
        //     author.textContent = "Written: " + name;
        //     let snippet = document.createElement("p");
        //     let snipText = response.response.docs[i].lead_paragraph;
        //     snippet.textContent = "Snippet: " + snipText;
            
            // div.appendChild(headline);
            // div.appendChild(datePub);
            // div.appendChild(author);
            // div.appendChild(snippet);
            // displayArticles.appendChild(div);
        })
}
