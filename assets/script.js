

// Function that calls the SuperHero API and searches for a hero by name.
function getSuperhero(heroSearch) {
    var queryURL = "https://superheroapi.com/api.php/10218260924767452/search/" + heroSearch;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // Once the superhero is found in the API, display that data to the page

    // Call a function to display the superhero's image
    getSuperheroImage(response)
    // Call function to display the superhero's data
    displaySuperInfo(response);

    // Call function to search the News API based on the hero's name and the word "superhero"
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

    // If any of the data is null, replace with the text "not found"
    var superData = [];

    // Push all of the data used on the page to a single array
    superData.push(heroData.name, heroData.biography["full-name"], heroData.connections["group-affiliation"], heroData.work.base, heroData.biography["first-appearance"], heroData.biography.publisher, heroData.appearance.gender, heroData.appearance.race, heroData.appearance["eye-color"], heroData.appearance["hair-color"]);

    // Call a function that replaces "null" data with the word "classified"
    superData = replaceNullData(superData);

    // Create elements for the data and display the data in each element.
    var heroName = $("<h2>").text(superData[0])
    var fullName = $("<p>").text("FULL NAME: " + superData[1]);
    var connections = $("<p>").text("Connections: " + superData[2]);
    var hQ = $("<p>").text("Headquartereds: " + superData[3]);
    var firstAppeared = $("<p>").text("First appeared in: " + superData[4]);
    var publisher = $("<p>").text("Published by: " + superData[5]);
    // For the appearance, have sub-sections for gender, race, eye color, and hair color
    var appearance = $("<div>");
    var gender = $("<p>").text("GENDER: " + superData[6]);
    var race = $("<p>").text("RACE: " + superData[7]);
    var eyeColor = $("<p>").text("EYE COLOR: " + superData[8]);
    var hairColor = $("<p>").text("HAIR COLOR: " + superData[9]);
    // Add appearance data to appearance div.
    appearance.append(gender, race, eyeColor, hairColor);
    // Add the elements to the hero info div
    $("#super-info").append(heroName, fullName, connections, hQ, firstAppeared, appearance, publisher);

}
// Function that replaces "null" data in the given array with the word "Classified" for a better viewing experience
function replaceNullData(heroData){
  // Loop through all the data within the array
  for (let i = 0; i < heroData.length; i++) {
    const element = heroData[i];
    // If the data at the current index is null or blank, replace with "Classified"
    if(element == "null" || element == "-"){
      heroData[i] = "CLASSIFIED";
    }
  }
  // Return the edited array
  return heroData;
}

// Add the superhero's picture to the page using data from the API.
function getSuperheroImage(response) {
// Replace the placeholder image with the new picture
  if(response.results[0].image.url != null){
    $("#hero-img").attr("src", response.results[0].image.url)
  }
}

// Function that is called by the image element on error, for example if an image can't be found
function imageNotFound(image){
  image.onerror = "";
  // Replace the image with a placeholder
  image.src = "https://via.placeholder.com/200.png?text=The+Daily+Dispatch";
  return true;
}

// Function to search the News API for news articles about the searched hero
function searchNews(heroSearch) {
  // URL that searches all articles based on relevancy, returning the first ten articles found.
  var queryURL = "https://newsapi.org/v2/everything?q=" + heroSearch + "&sortBy=relevancy&pageSize=7&apiKey=68f6bf548a8a4025ae19d9fdbe7ecfab";
  // Ajax call to the News API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // On success, calls a function to display the resulting articles to the page.
    renderNewsToPage(response);
  });


}

// Function that displays news articles to the page. 
function renderNewsToPage (response) {
  // Clear any existing news articles from a previous search
  $("#news-div").empty();

  // If there are no articles for the hero, display text instead of articles
  if(response.articles.length === 0){
    var newsHeading = $("<h5>").addClass("news-heading").text("There doesn't appear to be any recent news about this hero right now.");
    $("#news-div").append(newsHeading);
    return;
  }

  // Otherwise, loop through the array of articles
  for (let i = 0; i < response.articles.length; i++) {
    // newsMain is for future use to hold the image and the main news info
    var newsMain = $("<div>");

    // Create html elements to hold other info about the news article
    var newsInfo = $("<div>").addClass("news-info");
    var newsHeading = $("<h5>").addClass("news-heading").text(response.articles[i].title);
    var newsLink = $("<a>").attr("href", response.articles[i].url).attr("target", "_blank").append(newsHeading);
    var newsSourceDate = $("<h6>").text((response.articles[i].source.name) + " " + (new Date(response.articles[0].publishedAt).toLocaleDateString()));
    var newsDescription = $("<p>").text(response.articles[i].description).addClass("news-description");
  
    // Add each new element to the newsInfo div before adding it to the main news container
    newsMain.append(newsInfo.append(newsInfo, newsLink, newsSourceDate, newsDescription));

    // Add the built article to the "news-div" on the page.
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

// Create an on click event for the "random hero generation" button.
$(".random-hero-button").click(function(event) {
  // Prevent button click from refreshing page
  event.preventDefault();
  // Call function to search for a random hero
  pickRandomHeroID()
})

// display random superhero function
function pickRandomHeroID() {
  // couldn't find a way to dynamically pick the ID, the number 731 would need to be changed if the API changes
  superID = Math.floor(Math.random() * (731 - 1) + 1);

  // Builds Ajax query to search the SuperHero API using the randomly generated ID.
  var queryURL = "https://superheroapi.com/api.php/10218260924767452/" + superID;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // After obtaining the hero's name for the generated ID, call the functions that search and display the rest of the data to the page.
    heroName = response.name;
    getSuperhero(heroName);
  });
}

