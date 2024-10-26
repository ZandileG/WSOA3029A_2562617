//I used and modified the code from the heatmap data visualisation tutorial in class.

//Fetches my API data
//The API has Brooklyn Nine-Nine Data
fetch("https://api.tvmaze.com/shows/49/episodes")
    .then(function(response){
        return response.json();
    })