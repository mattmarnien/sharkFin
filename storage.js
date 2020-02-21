
portfolio.addEventListener("addPortSubmit", function(event) {
    event.preventDefault();
    var stocks = stockInfo.value;
    var newStocks = [];
    var savedStocks = JSON.parse(localStorage.getItem("stock"));
    if (savedStocks !== null) {
        newStocks = savedStocks;
    }

    var newStocksObj = {
        Name: newStockName.text(),
        Price: newStockPrice.text(),
        Quantity: newStockQuantity.val()
    
    }
        console.log(newStocksObj);

    newStocks.push(newStocksObj);
    // console.log(newStocks);
    var stockArr = JSON.stringify(newStocks);

    localStorage.setItem("stock", stockArr);
    // location.href="portfolio.html"

})





