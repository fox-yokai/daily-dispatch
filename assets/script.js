

function getSuperhero(heroSearch) {
    var queryURL = "https://superheroapi.com/api.php/10218260924767452/search/" + heroSearch;
  $.ajax({
    url: queryURL,
    type: "GET"
  }).then(function(response) {
    console.log(response);
    displaySuperInfo(response);
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
    var appearance = $("<div>").text("Appearance: ");
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

function searchNews (heroSearch) {
    $.ajax({
        type: "GET",
        URL: "https://newsapi.org/v2/everything?q=" + heroSearch + "&sortBy=relevancy&pageSize=10&apiKey=68f6bf548a8a4025ae19d9fdbe7ecfab",
        dataType: "json",
        success: function(data) {
            console.log(data);

            // code where the data will be dynamically created on the webpage
        }
    });

}

