var searchForm = $("#searchForm");
var searchInput = $(".searchInput");
var searchSubmit = $("#searchSubmit");
var displayRow = $("#displayRow");
var optionsDiv = $("<div id='company-options'>");
var searchButton = $("#searchButton");
var optionsDiv = $("#optionsDiv");
var modal1 = $("#modal1");
var searchTerm = '';
var searchSymbol = '';
var searchPrice = 0;
var searchTerm = '';
var startYear = null;
var endYear = null;
var total = 0;
/////////
//Portfolio Values
/////
// var portfolioStart = 1000000;
// var portfolioValue = 1000000;
// var portfolioReturn = portfolioValue/portfolioStart;
var portfolioCash = 1000000.00;

queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=4EOJKMRS4JOT2AEA";




function getInfo(foundSymbol) {

    searchSymbol = foundSymbol;
    var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + searchSymbol + "&outputsize=compact&apikey=4EOJKMRS4JOT2AEA";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var infoDiv = ("<div id='stockInfo' class='card-panel blue lighten-1 col s4 white-text'>");
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
        newStockPrice.text(firstKey["1. open"]);
        searchPrice = firstKey["1. open"];
        stockInfo.append(newStockPrice);
        newStockHigh.text(firstKey["2. high"]);
        stockInfo.append(newStockHigh);
        newStockLow.text(firstKey["3. low"]);
        stockInfo.append(newStockLow);
        newStockVol.text(firstKey["5. volume"]);
        stockInfo.append(newStockVol);
    });
}

searchForm.on("submit", function (event) {
    event.preventDefault();
    searchTerm = searchInput.val();
    displayRow.empty();
    optionsDiv.empty();
    var symbolQueryURL = "https://financialmodelingprep.com/api/v3/search?query=" + searchTerm + "&limit=10";
    $.ajax({
        url: symbolQueryURL,
        method: "GET"
    }).then(function (response) {
        var symbol = '';

        //No response from api
        if (response.length === 0) {
            var p = $("<p>");
            p.text("No results ...");
            optionsDiv.append(p);
            //Only one company was returned
        } else if (response.length === 1) {
            symbol = response[0].symbol;
            getInfo(symbol);
            // searchNYT();
        } else {
            //multiple companies returned            
            for (var i = 0; i < response.length && i < 5; i++) {
                var newButton = $("<button class='choiceBtn btn blue'>");
                var name = response[i].name;
                newButton.text(name);
                newButton.attr("value", response[i].symbol);
                optionsDiv.append(newButton);
            }
            choices = $(".choiceBtn");
            choices.on("click", function (event) {
                event.preventDefault();
                symbol = $(this).val();
                getInfo(symbol);
                optionsDiv.empty();
            })





        }
    });
});

searchButton.on("click", function (event) {
    console.log("clicked")
    searchTerm = searchInput.val();
    displayRow.empty();
    optionsDiv.empty();
    var symbolQueryURL = "https://financialmodelingprep.com/api/v3/search?query=" + searchTerm + "&limit=10";
    $.ajax({
        url: symbolQueryURL,
        method: "GET"
    }).then(function (response) {
        var symbol = '';

        //No response from api
        if (response.length === 0) {
            var p = $("<p>");
            p.text("No results ...");
            optionsDiv.append(p);
            //Only one company was returned
        } else if (response.length === 1) {
            symbol = response[0].symbol;
            getInfo(symbol);
        } else {
            console.log("in the else")
            //multiple companies returned            
            for (var i = 0; i < response.length; i++) {
                console.log("makin buttons");
                var newButton = $("<button class='choiceBtn'>");
                var name = response[i].name;
                newButton.text(name);
                newButton.attr("value", response[i].symbol);
                optionsDiv.append(newButton);

            }
            choices = $(".choiceBtn");
            choices.on("click", function (event) {
                event.preventDefault();
                symbol = $(this).val();
                getInfo(symbol);
                optionsDiv.empty();
                // searchNYT();
            })
            // $("#modal1").modal(open);
        }
    });

});
// NYT News Search Code
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=gtGyME9eJStqbpLqVNHQQKExu01uGU0X";


function getNewsQuery() {
    if (startYear !== null && endYear !== null) {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=" + startYear + "0101&end_date=" + endYear + "1231&q=" + searchTerm + "&fq=news_desk:Business&api-key=gtGyME9eJStqbpLqVNHQQKExu01uGU0X";

    }

    else if (startYear === null && endYear !== null) {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=19000101&end_date=" + endYear + "1231&q=" + searchTerm + "&fq=news_desk:Business&api-key=gtGyME9eJStqbpLqVNHQQKExu01uGU0X";
    }
    else if (startYear !== null && endYear === null) {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=" + startYear + "0101&end_date=20201231&q=" + searchTerm + "&fq=news_desk:Business&api-key=gtGyME9eJStqbpLqVNHQQKExu01uGU0X";
    }
    else {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&fq=news_desk:Business&api-key=gtGyME9eJStqbpLqVNHQQKExu01uGU0X";

    }
    return queryURL;
}
function updatePage(NYTData) {
    // Get from the form # of results to display
    // Create limit parameter for API
    var numArticles = NYTData.response.docs.length;

    // Log NYTData to console
    console.log(NYTData);
    console.log("-----------------------");

    // Loop through and build elements for defined number of articles
    for (var i = 0; i < numArticles; i++) {

        // Get specific article info for current index
        var article = NYTData.response.docs[i];

        // Create list group to contain articles and add article content
        var stockNews = $("<ul>");
        stockNews.addClass("list-group");

        // Add newly created element to DOM
        $(".stockNews").append(stockNews);

        // Log and append headline to $articleList
        var headline = article.headline;
        var stockNewsItem = $("<li class='list-group-item articleHeadline'>");

        if (headline && headline.main) {
            console.log(headline.main);
            stockNewsItem.append(
                "<strong> " +
                "<h5> <span class='label label-primary'>" +
                (i + 1) + ". " +
                "</span>" + headline.main + "</h5>" +
                "</strong>"
            );
        }

        var byline = article.byline;

        if (byline && byline.original) {
            console.log(byline.original);
            stockNewsItem.append("<h5>" + byline.original + "</h5>");
        }

        // Log section, and append to document if exists
        var section = article.section_name;
        console.log(article.section_name);
        if (section) {
            stockNewsItem.append("<h5>Section: " + section + "</h5>");
        }

        // Log published date, and append to document if exists
        var pubDate = article.pub_date;
        console.log(article.pub_date);
        if (pubDate) {
            stockNewsItem.append("<h5>" + article.pub_date.substring(0, 10) + "</h5>");
        }

        // Append and log url
        var a = document.createElement("a");
        a.setAttribute("href", article.web_url);
        a.textContent = article.web_url;
        var articleUrl = "<a href='" + article.web_url + "'>" + article.web_url + "</a>";
        console.log(a);
        stockNewsItem.append(a);
        console.log(stockNewsItem);

        // Append the article
        stockNews.append(stockNewsItem);


    }
}
function searchNYT() {
    var newsQueryURL = getNewsQuery();
    $.ajax({
        url: newsQueryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        updatePage(response);
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

/////////////
//Portfolio Add Button/Form
//////

var toPortButton = $("#addPortSubmit");
var stockNumInput = $("#stockNumber");
var stockNumForm = $("stockCount");

stockNumInput.on("change", function () {
   
    console.log("change triggered");
    let price = parseInt(searchPrice);
    let quant = parseInt(stockNumInput.val());
    total = (price * quant).toFixed(2);
    if(isNaN(stockNumInput.val())){
        $("#errorMessageDiv").text("Please enter a valid number.");
   
    }
    else{
        $("#totalCost").text("Total Cost: $" + total);
    }
})



stockNumForm.on("submit", function (event) {
    event.preventDefault();
    addtoPortfolio();
})

$('#openBuyModal').on("click", function() {
    $('.modal').modal();
    portfolioCash = localStorage.getItem("cash");
    if(portfolioCash === null){
        portfolioCash = 1000000.00;
    }
    $("#startingFunds").text("Cash Available: $" + portfolioCash);
    $("#stockSelected").text(searchSymbol);



})

toPortButton.on("click", function (event) {
    addtoPortfolio();
})


function addtoPortfolio() {

    if (total <= portfolioCash) {
        portfolioCash -= total
        console.log(portfolioCash);
        let newStockCount = parseInt(stockNumInput.val());
        var newStocksObj = {
            name: searchSymbol,
            price: searchPrice,
            quantity: newStockCount,
        }

        var newStocks = [];
        var savedStocks = JSON.parse(localStorage.getItem("stock"));
        if (savedStocks !== null) {
            newStocks = savedStocks;
        }
        console.log(newStocks);

        
            for (let i = 0; i <newStocks.length; i++){
            if (searchSymbol === newStocks[i].name){
                console.log("adding to exisiting holdings")
                newStocks[i].quantity += newStocksObj.quantity;
                console.log(newStocksObj)
                console.log(newStocks);
            
            }
            else{
                console.log("adding new stock");
                newStocks.push(newStocksObj);
            }
        }  
        if (savedStocks === null) {
            console.log("first run");
            newStocks.push(newStocksObj);
        }
          
        var stockArr = JSON.stringify(newStocks);
        localStorage.setItem("stock", stockArr);
        localStorage.setItem("cash", portfolioCash);
        $("#modalBuy").modal('close');
    } else if(isNaN(stockNumInput.val())){
        $("#errorMessageDiv").text("Please enter a valid number.");
   
    } else {
        $("#errorMessageDiv").text("Insufficient funds available. Please lower purchase quantity, or select a different security, or free up some cash.");
    }





}

// $('.modal').modal();



var portfolioDisplayDiv = $("#portfolioDisplayDiv");
var portTotal = 0;

function generatePortfolio(){
    let newRow = $("<div class='row m-0'>");
    portfolioDisplayDiv.append(newRow);
    var portfolioArr = JSON.parse(localStorage.getItem("stock"));
    let nameDiv = $("<div class='card col s4'>");
    let nameh4 = $("<h4>");
    let quantityDiv = $("<div class='card col s4'>");
    let quantityh4 = $("<h4>");
    let valueDiv = $("<div class='card col s4'>");
    let valueh4 = $("<h4>");
    nameh4.text("Stock Symbol");
    quantityh4.text("Shares Owned");
    valueh4.text("Current Price");
   
    newRow.append(nameDiv, quantityDiv, valueDiv);
    nameDiv.append(nameh4);
    quantityDiv.append(quantityh4);
    valueDiv.append(valueh4);
    console.log(portfolioArr)

if (portfolioArr !== null){
      for (i=0; i < portfolioArr.length; i++){
          let priceToRound = 0;
        let queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + portfolioArr[i].name + "&outputsize=compact&apikey=4EOJKMRS4JOT2AEA";

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function (response) {
    //         console.log(response);
    // let firstKey = response["Time Series (Daily)"][Object.keys(response["Time Series (Daily)"])[0]];
    // priceToRound = parseInt(firstKey["1. open"]);
    //     })
    
    let nameDiv = $("<div class='card col s4'>");
    let nameh4 = $("<h4>");
    let quantityDiv = $("<div class='card col s4'>");
    let quantityh4 = $("<h4>");
    let valueDiv = $("<div class='card col s4'>");
    let valueh4 = $("<h4>");
    nameh4.text(portfolioArr[i].name);
    quantityh4.text(portfolioArr[i].quantity);
    priceToRound = parseInt(portfolioArr[i].price);
    let roundPrice= priceToRound.toFixed(2);
    valueh4.text(roundPrice);
   
    newRow.append(nameDiv, quantityDiv, valueDiv);
    nameDiv.append(nameh4);
    quantityDiv.append(quantityh4);
    valueDiv.append(valueh4);

    var subtotal = 0
    subtotal = portfolioArr[i].price * portfolioArr[i].quantity;
    portTotal += subtotal;
    let remaining = 1000000 - portTotal;
    let change = (((remaining+ portTotal)/1000000)-1).toFixed(2);
    let net = remaining + portTotal - 1000000;

    $("#total").text("Total Value: " + (portTotal+remaining).toFixed(2));
    $("#change").text("Change in Value: " + change + "%");
    $("#net").text("Net Change: " + net)
        }


        
    }
}




generatePortfolio();

