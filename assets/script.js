


function getSuperhero(heroSearch) {
    var queryURL = "https://superheroapi.com/api.php/10218260924767452/search/" + heroSearch;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
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

    // If any of the data is null, replace with the text "not found"
    var superData = [];
    superData.push(heroData.name, heroData.biography["full-name"], heroData.connections["group-affiliation"], heroData.work.base, heroData.biography["first-appearance"], heroData.biography.publisher, heroData.appearance.gender, heroData.appearance.race, heroData.appearance["eye-color"], heroData.appearance["hair-color"]);
    superData = replaceNullData(superData);
    console.log(superData);
    // Create elements for the data
    var heroName = $("<h2>").text(superData[0])
    var fullName = $("<p>").text("Full Name: " + superData[1]);
    var connections = $("<p>").text("Connections: " + superData[2]);
    var hQ = $("<p>").text("Headquartered in: " + superData[3]);
    var firstAppeared = $("<p>").text("First appeared in: " + superData[4]);
    var publisher = $("<p>").text("Published by: " + superData[5]);
    // For the appearance, have sub-sections for gender, race, eye color, and hair color
    var appearance = $("<div>");
    var gender = $("<p>").text("Gender: " + superData[6]);
    var race = $("<p>").text("Race: " + superData[7]);
    var eyeColor = $("<p>").text("Eye Color: " + superData[8]);
    var hairColor = $("<p>").text("Hair Color: " + superData[9]);
    // Add appearance data to appearance div.
    appearance.append(gender, race, eyeColor, hairColor);
    // Add the elements to the hero info div
    $("#super-info").append(heroName, fullName, connections, hQ, firstAppeared, appearance, publisher);

}


function replaceNullData(heroData){
  for (let i = 0; i < heroData.length; i++) {
    const element = heroData[i];
    if(element == "null" || element == "-"){
      heroData[i] = "Classified";
    }
  }

  return heroData;
}

// Add the superhero's picture to the page using data from the API.
function getSuperheroImage(response) {
// If the hero has an image in the data, replace the placeholder image with the new picture
  if(response.results[0].image.url != null){
    $("#hero-img").attr("src", response.results[0].image.url)
  }
}

function imageNotFound(image){
  image.onerror = "";
  image.src = "https://via.placeholder.com/200.png?text=The+Daily+Dispatch";
  return true;
}


function searchNews(heroSearch) {
  var queryURL = "https://newsapi.org/v2/everything?q=" + heroSearch + "&sortBy=relevancy&pageSize=10&apiKey=68f6bf548a8a4025ae19d9fdbe7ecfab";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    renderNewsToPage(response);
  });

  // setting the height of the right div = to the left
  var right=$('#news-div').height();
    var left=$('#super-div').height();
    console.log(right, left)
    if(left>right)
    {
        $('#news-div').height(left);
    }
    else
    {
        $('#super-div').height(right);
    }

}

function renderNewsToPage (response) {
  // Clear any existing news articles from a previous search
  $("#news-div").empty();

  // If there are no articles for the hero, display text instead of articles
  if(response.articles.length === 0){
    var newsHeading = $("<h5>").addClass("news-heading").text("There doesn't appear to be any recent news about this hero right now.");
    $("#news-div").append(newsHeading);
    return;
  }

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

