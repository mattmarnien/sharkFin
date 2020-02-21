var portfolioDisplayDiv = $("#portfolioDisplayDiv");

function generatePortfolio(){
    var portfolioArr = JSON.parse(localStorage.getItem("stock"));
if (portfolioArr !== null){
    console.log(portfolioArr);
    for (i=0; i < portfolioArr.length; i++){
    let newRow = $("<div class='row'>");
    let nameDiv = $("<div class='col s4'>");
    let nameh4 = $("<h4>");
    let quantityDiv = $("<div class='col s4'>");
    let quantityh4 = $("<h4>");
    let valueDiv = $("<div class='col s4'>");
    let valueh4 = $("<h4>");
    nameh4.text(portfolioArr[i].name);
    quantityh4.text(portfolioArr[i].quantity);
    valueh4.text(portfolioArr[i].price);
    portfolioDisplayDiv.append(newRow);
    newRow.append(nameDiv, quantityDiv, valueDiv);
    nameDiv.append(nameh4);
    quantityDiv.append(quantityh4);
    valueDiv.append(valueh4);

    


        
    }
}

}

generatePortfolio();