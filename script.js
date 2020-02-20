var searchForm = $("#searchForm");
var searchInput = $(".searchInput");
var searchSubmit = $("#searchSubmit");
var displayRow = $("#displayRow");
// var searchSubmit = $("#searchSubmit");
var searchTerm = '';
var searchSymbol = '';
var searchTerm = '';
var startYear = null;
var endYear = null;
queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=4EOJKMRS4JOT2AEA";







function getInfo(foundSymbol){
    
    searchSymbol = foundSymbol;
    
   

    var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + searchSymbol + "&outputsize=compact&apikey=4EOJKMRS4JOT2AEA";
    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    var infoDiv = ("<div id='stockInfo' class='card-panel teal col s4'>");
    displayRow.append(infoDiv);
    var stockInfo = $("#stockInfo");
    stockInfo.empty();
    var newStockName = $("<p>");
    var newStockPrice = $("<p>");
    var newStockHigh = $("<p>");
    var newStockLow = $("<p>");
    var newStockVol = $("<p>");
    newStockName.text(response["Meta Data"]["2. Symbol"]);
    stockInfo.append(newStockName);
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
    
    // infoDiv.attr("id", "stockInfo");
    // infoDiv.attr("class", "card-panel teal");
    

    var symbolQueryURL = "https://financialmodelingprep.com/api/v3/search?query=" + searchTerm + "&limit=10";
    
    $.ajax({
        url: symbolQueryURL,
        method: "GET"
    }).then(function(response) {
        var symbol ='';
        var optionsDiv = $("<div id='company-options'>");
       searchForm.append(optionsDiv)
        //No response from api
        if(response.length === 0){
           var p = $("<p>");
           p.text("No results ...");
           optionsDiv.append(p);
        }else if(response.length === 1){ //Only one company was returned
           symbol = response[0].symbol;
           getInfo(symbol);
        //    queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=4EOJKMRS4JOT2AEA";
        
        //     $.ajax({
        //         url: queryURL,
        //         method: "GET"
        //      }).then(function(response) {
        //             console.log(response);
        //      });

        } else{ //multiple companies returned

            
            for(var i = 0; i < response.length; i++){
                console.log("in the for loop")
                console.log(response);
                var newButton = $("<button class='choiceBtn'>");
                console.log(response[i].name);
                var name = response[i].name;
                newButton.text(name);
                newButton.attr("value",response[i].symbol);
                optionsDiv.append(newButton);
                
            }
            choices = $(".choiceBtn");
            choices.on("click",function(event){
                event.preventDefault();
                symbol = $(this).val();
                console.log(symbol);
                getInfo(symbol);
                optionsDiv.empty();
                // queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=4EOJKMRS4JOT2AEA";
        
                // $.ajax({
                //     url: queryURL,
                //     method: "GET"
                // }).then(function(response) {
                //     console.log(response);
                // });
        
            })
        
        }
        // getInfo(symbol);
        
        
        
    });

    // newsQueryURL = getNewsQuery();
    // search();
    
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
