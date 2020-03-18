

function getSuperhero(heroSearch) {
  var queryURL = "https://superheroapi.com/api.php/10218260924767452/search/" + heroSearch;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    searchNews(heroSearch);
    
  });


}

getSuperhero("Batman");

function searchNews(heroSearch) {
  var queryURL = "https://newsapi.org/v2/everything?q=" + heroSearch + "&sortBy=relevancy&pageSize=10&apiKey=68f6bf548a8a4025ae19d9fdbe7ecfab";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    renderNewsToPage(response);
  });

}

function renderNewsToPage (response) {
  for (let i = 0; i < response.articles.length; i++) {
    // newsMain is for future use to hold the image and the main news info
    var newsMain = $("<div>");
    var newsInfo = $("<div>").addClass("news-info");
    var newsHeading = $("<h5>").addClass("news-heading").text(response.articles[i].title);
    var newsSourceDate = $("<h6>").text((response.articles[i].source.name) + " " + (new Date(response.articles[0].publishedAt).toLocaleDateString()));
    var newsDescription = $("<p>").text(response.articles[i].description).addClass("news-description");
  
    newsMain.append(newsInfo.append(newsInfo, newsHeading, newsSourceDate, newsDescription));
    $("#news-div").append(newsMain);
    
  }

}