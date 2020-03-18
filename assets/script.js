


function getSuperhero(heroSearch) {
    var queryURL = "https://superheroapi.com/api.php/10218260924767452/search/" + heroSearch;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);
    getSuperheroImage(response)
    displaySuperInfo(response);
    searchNews(heroSearch);
    
  });
}
// Function to dynamically display the superhero data on the page
function displaySuperInfo(response){
    // Empty the superhero info div
    $("#super-info").empty();

    // Grab the superhero data from the response
    var heroData = response.results[0];

    // Create elements for the data
    var heroName = $("<h2>").text(heroData.name)
    var fullName = $("<p>").text("Full Name: " + heroData.biography["full-name"]);
    var connections = $("<p>").text("Connections: " + heroData.connections["group-affiliation"]);
    var hQ = $("<p>").text("Headquartered in: " + heroData.work.base);
    var firstAppeared = $("<p>").text("First appeared in: " + heroData.biography["first-appearance"]);
    var publisher = $("<p>").text("Published by: " + heroData.biography.publisher);
    // For the appearance, have sub-sections for gender, race, eye color, and hair color
    var appearance = $("<div>");
    var gender = $("<p>").text("Gender: " + heroData.appearance.gender);
    var race = $("<p>").text("Race: " + heroData.appearance.race);
    var eyeColor = $("<p>").text("Eye Color: " + heroData.appearance["eye-color"]);
    var hairColor = $("<p>").text("Hair Color: " + heroData.appearance["hair-color"]);
    // Add appearance data to appearance div.
    appearance.append(gender, race, eyeColor, hairColor);
    // Add the elements to the hero info div
    $("#super-info").append(heroName, fullName, connections, hQ, firstAppeared, appearance, publisher);

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
