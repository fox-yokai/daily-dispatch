


function getSuperhero(heroSearch) {
  var queryURL = "https://superheroapi.com/api.php/10218260924767452/search/" + heroSearch;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);
    getSuperheroImage(response)
  });


}
getSuperhero("Batman");

function getSuperheroImage(response) {
  var image = $("#hero-img").attr("src", response.results[0].image.url)
  console.log(response)
  
  $("#hero-img").append()

}


function searchNews(heroSearch) {
  var queryURL = "https://newsapi.org/v2/everything?q=" + heroSearch + "&sortBy=relevancy&pageSize=10&apiKey=68f6bf548a8a4025ae19d9fdbe7ecfab";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);
  });

}

searchNews("Batman");