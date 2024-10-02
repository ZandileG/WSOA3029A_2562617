//Fetches my API data
fetch("https://api.tvmaze.com/shows/49/episodes")
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
    //This is an object that I will use to hold the number of episodes per season
    const episodes = {};

    //Finds the season for the current episode and does it for all the episodes
    data.forEach(function (episode){
    const seasonNumber = episode.season;

    //If a season exists it must start counting epsiodes for the season starting from 0
    if (!episodes[seasonNumber]){
        episodes[seasonNumber] = 0;
    }

    episodes[seasonNumber]++;
});

//Makes the object at the top into an array of other objects
const seasonsData = Object.entries(episodes).map(function([seasonNumber, episodeCount]){
    return { 
        season: seasonNumber, 
        count: episodeCount 
    };
    });
    
    //Runs the function to create the chart
    createBubbleChart(seasonsData);
});

//Creates the bubble chart
function createBubbleChart(data) {
let width = 800;
let height = 625;

//Adds the svg in the section element in my Episodes page
let svg = d3
    .select("section")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


//Create scales
const sizeScale = d3
    .scaleSqrt()
    .domain([0, d3.max(data, d => d.count)])
    .range([10, 80]);

//Simulation for the bubbles 
const simulation = d3
    .forceSimulation(data)
    .force("charge", d3.forceManyBody().strength(5))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide(d => sizeScale(d.count)))
    .on("tick", ticked);

//Create circles
const bubbles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "bubble")
    .attr("r", d => sizeScale(d.count))
    .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

//Labels for the bubbles
const labels = svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    /*.text(d => `Season ${d.season}: ${d.count}`)*/
    .text(d => `Season ${d.season}`)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px");

//Function to update the bubble positions
function ticked() {
    bubbles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);
}
}