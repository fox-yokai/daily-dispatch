


function getSuperhero(heroSearch) {
    var queryURL = "https://superheroapi.com/api.php/10218260924767452/search/" + heroSearch;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);
    getSuperheroImage(response)
    displaySuperInfo(response);
    var heroName = response.results[0].name + " superhero"
    searchNews(heroName);
    
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
    // Clear any existing news articles from a previous search
    $("#news-div").empty();

  for (let i = 0; i < response.articles.length; i++) {
    // newsMain is for future use to hold the image and the main news info
    var newsMain = $("<div>");
    var newsInfo = $("<div>").addClass("news-info");
    var newsHeading = $("<h5>").addClass("news-heading").text(response.articles[i].title);
    var newsLink = $("<a>").attr("href", response.articles[i].url).attr("target", "_blank").append(newsHeading);
    var newsSourceDate = $("<h6>").text((response.articles[i].source.name) + " " + (new Date(response.articles[0].publishedAt).toLocaleDateString()));
    var newsDescription = $("<p>").text(response.articles[i].description).addClass("news-description");
  
    newsMain.append(newsInfo.append(newsInfo, newsLink, newsSourceDate, newsDescription));
    $("#news-div").append(newsMain);
    
  }

}

// Create on click/submit event for search bar
$(".search-button").click(function(event){
    event.preventDefault();
    // Store the selector for the input box next to the search button that was clicked
    var inputBox = $("#search-text");

    // Store the text that was entered into the input box
    var heroSearch = inputBox.val();
    
    // Clear the input box of any previous text
    inputBox.val("");

    // Search for any heroes that match the input text
    getSuperhero(heroSearch);
    
});

$(".random-hero-button").click(function(event) {
  event.preventDefault();
  pickRandomHeroID()
})

// display random superhero function
function pickRandomHeroID() {
  // couldn't find a way to dynamically pick the ID, the number 731 would need to be changed if the API changes
  superID = Math.floor(Math.random() * (731 - 1) + 1);
  var queryURL = "https://superheroapi.com/api.php/10218260924767452/" + superID;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    heroName = response.name;
    getSuperhero(heroName);
  });
}
