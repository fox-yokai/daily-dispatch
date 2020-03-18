


function searchNews (heroSearch) {
    $.ajax({
        type: "GET",
        URL: "http://newsapi.org/v2/everything?q=" + heroSearch + "&sortBy=relevancy&pageSize=10&apiKey=68f6bf548a8a4025ae19d9fdbe7ecfab",
        dataType: "json",
        success: function(data) {
            console.log("success");

            // code where the data will be dynamically created on the webpage
        }
    });

}