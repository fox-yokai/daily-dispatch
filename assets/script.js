

function getSuperhero(heroSearch) {
    var queryURL = "https://superheroapi.com/api/10218260924767452/search/" + heroSearch;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

  console.log(heroSearch)


}
getSuperhero("Batman")