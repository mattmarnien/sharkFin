var portfolioDisplayDiv = $("#portfolioDisplayDiv");
var total = 0;

function generatePortfolio(){
    var portfolioArr = JSON.parse(localStorage.getItem("stock"));
if (portfolioArr !== null){
      for (i=0; i < portfolioArr.length; i++){
    let newRow = $("<div class='row m-0'>");
    let nameDiv = $("<div class='card col s4'>");
    let nameh4 = $("<h4>");
    let quantityDiv = $("<div class='card col s4'>");
    let quantityh4 = $("<h4>");
    let valueDiv = $("<div class='card col s4'>");
    let valueh4 = $("<h4>");
    nameh4.text(portfolioArr[i].name);
    quantityh4.text(portfolioArr[i].quantity);
    valueh4.text(portfolioArr[i].price);
    portfolioDisplayDiv.append(newRow);
    newRow.append(nameDiv, quantityDiv, valueDiv);
    nameDiv.append(nameh4);
    quantityDiv.append(quantityh4);
    valueDiv.append(valueh4);

    var subtotal = 0
    subtotal = portfolioArr[i].price * portfolioArr[i].quantity;
    total += subtotal;
let remaining = 1000000 - total;
    let change = ((total/1000000)*100).toFixed(2);
    let net = remaining + total - 1000000;

    $("#total").text("Total Value: " + (total+remaining).toFixed(2));
    $("#change").text("Change in Value: " + change + "%");
    $("#net").text("Net Change: " + net)


        
    }
}

}

generatePortfolio();
