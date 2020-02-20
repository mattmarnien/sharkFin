// var stockNews = ("#stockNews");

// Loop through and build elements for defined number of articles

function updatePage(NYTData) {
    // Get from the form # of results to display
    // Create limit parameter for API
    var numArticles = $("#article-count").val();

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
        $("#article-section").append(stockNews);

        // Log and append headline to $articleList
        var headline = article.headline;
        var stockNews = $("<li class='list-group-item articleHeadline'>");

        if (headline && headline.main) {
            console.log(headline.main);
            stockNewsItem.append(
                "<span class='label label-primary'>" +
                articleCount +
                "</span>" +
                "<strong> " +
                headline.main +
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
            stockNewsItem.append("<h5>" + article.pub_date + "</h5>");
        }

        // Append and log url
        stockNewsItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
        console.log(article.web_url);

        // Append the article
        stockNews.append(stockNews);
    

    }
}


