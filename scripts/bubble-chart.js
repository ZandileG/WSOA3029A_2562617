//Fetches my API data
fetch("https://api.tvmaze.com/shows/49/episodes")
    .then(function(response){
        return response.json();
    })

    .then(function(data){
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
let width = 880;
let height = 780;

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

//Colour scale to make the seasons with the same episode count the same colour
const colorScale = d3
    .scaleOrdinal()
    .domain(data.map(d => d.count)) 
    .range(d3.schemeCategory10); 

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
    .attr("fill", d => colorScale(d.count)) 
    .attr("stroke", "black");

//Labels for the bubbles
const labels = svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => `Season ${d.season}`)
    .attr("text-anchor", "middle")
    .attr("font-size", "1rem")
    .on("mouseover", (e, datum) => showTooltip(datum))
    .on("mousemove", moveTooltip)
    .on("mouseout", removeTooltip);

//Tooltip that shows the number of episodes in the season that is hovered on
let tooltip = d3.select("section")
                .append("div")
                .style("color", "black")
                .style("font-weight", "bold")
                .style("background-color", "rgb(236, 226, 226)")
                .style("padding", "0.5rem")
                .style("border-radius", "10%")
                .style("border", "1px solid black")
                .style("position", "relative")
                .style("width", "1.25rem")
                .style("opacity", 0);

function showTooltip(datum){
    tooltip.style("opacity", 1).html(datum.count);
    tooltip.style("left", d3.pointer(event)[0] + 200 + "px");
    tooltip.style("top", d3.pointer(event)[1] - 800 + "px");
}

function moveTooltip(){
    tooltip.style("left", d3.pointer(event)[0] + 200 + "px");
    tooltip.style("top", d3.pointer(event)[1] - 800 + "px");
}

function removeTooltip(){
    tooltip.style("opacity", 0);
}

//Function to update the bubble positions
function ticked() {
    bubbles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    }

//When the combine button is clicked, the bubbles will move closer together
    d3.select("#combine").on("click", function() {
        simulation.force("charge", d3.forceManyBody().strength(50)); 
        simulation.alpha(1).restart(); // Restart simulation
    });

//When the split button is clicked, the bubbles will move away from each other
    d3.select("#split").on("click", function() {
        simulation.force("charge", d3.forceManyBody().strength(-50)); 
        simulation.alpha(1).restart(); 
    });
}

