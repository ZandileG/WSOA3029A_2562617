//I used and modified the code from the scatterplot graph data visualisation tutorial in class.
/*I learnt how to fetch data from two APIs from this website:
https://rapidapi.com/guides/fetch-data-multiple-apis-with-fetch*/

//Fetching Brooklyn Nine-Nine's episode data
fetch("https://api.tvmaze.com/shows/49/episodes")
.then(response => response.json())
.then(brooklynData => {

//Fetch Psych's episode data
    return fetch("https://api.tvmaze.com/singlesearch/shows?q=psych&embed=episodes")
        .then(response => response.json())
        .then(psychData => {

//Getting the season, episode and rating from both shows
try{
    const brooklynEpisodes = brooklynData.map((episode, index) => {
        return{
            episodeNumber: index + 1,
            rating: episode.rating.average,
            season: episode.season,
            show: "Brooklyn Nine-Nine"
        };
    });

    const psychEpisodes = psychData._embedded.episodes.map((episode, index) => {
        return{
             episodeNumber: index + 1,
             rating: episode.rating.average,
             season: episode.season,
             show: "The Psych"
        };
    });

//Combining both shows' data and running the function
    const allEpisodes = [...brooklynEpisodes, ...psychEpisodes];

    const totalEpisodes = allEpisodes.length;

    createGraph(allEpisodes, totalEpisodes);
} 
    catch (error){
    console.error("Error processing the shows' episode data:", error);
    }
})
    .catch(error => {
    console.error("Error fetching data from the APIs:", error);

    });
});

function createGraph(data, totalEpisodes){
let HEIGHT = 600,
    WIDTH = 600,
    MARGIN = 80;

//Adding the svg to my html file
let svg = d3.select(".graph")
    .append("svg")
    .attr("height", HEIGHT + MARGIN + MARGIN)
    .attr("width", WIDTH + MARGIN + MARGIN)
    .append("g")
    .attr("transform", `translate(${MARGIN}, ${MARGIN})`);

//Creating the scales and axes
let xScale = d3.scaleLinear().domain([1, 180]).range([0, WIDTH]);  
svg.append("g")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(d3.axisBottom(xScale))
    .call(g => {
        g.append("text")
            .style("fill", "black")
            .text("Episodes")
            .attr("font-size", "1rem")
            .attr("font-family", "Nunito")
            .attr("x", WIDTH / 2)
            .attr("y", 50);
    });

let yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.rating)]).range([HEIGHT, 0]);
svg.append("g")
    .call(d3.axisLeft(yScale))
    .call(g => {
        g.append("text")
            .style("fill", "black")
            .text("Ratings")
            .attr("font-size", "1rem")
            .attr("font-family", "Nunito")
            .attr("transform", `translate(-40, ${HEIGHT / 2}) rotate(-90)`);
    });

//Brooklyn Nine-Nine will be coloured in blue and Psych will be orange
let colorScale = d3.scaleOrdinal()
    .domain(["Brooklyn 99", "Psych"])
    .range(["#1f77b4", "#ff7f0e"]);  

svg.selectAll(".circles")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.episodeNumber))
    .attr("cy", d => yScale(d.rating))
    .attr("r", 4)
    .style("fill", d => colorScale(d.show))
    .attr("class", d => "circles show-" + d.show)
    .on("mouseover", (e, datum) => showTooltip(e, datum))
    .on("mousemove", moveTooltip)
    .on("mouseout", removeTooltip);

//Creating the tooltip
let tooltip = d3.select(".graph")
    .append("div")
    .style("color", "black")
    .style("font-weight", "bold")
    .style("background-color", "rgb(236, 226, 226)")
    .style("padding", "0.5rem")
    .style("border-radius", "10%")
    .style("border", "1px solid black")
    .style("position", "absolute")
    .style("width", "1.7rem")
    .style("opacity", 0);

function showTooltip(e, datum) {
    tooltip.style("opacity", 1).html(datum.rating);
    tooltip.style("left", e.pageX + 10 + "px");
    tooltip.style("top", e.pageY - 50 + "px");
}

function moveTooltip(e) {
    tooltip.style("left", e.pageX + 10 + "px");
    tooltip.style("top", e.pageY - 50 + "px");
}

function removeTooltip() {
    tooltip.style("opacity", 0);
}

//Creating the key
const shows = ["Brooklyn 99", "Psych"];
svg.append("g")
    .selectAll("circle")
    .data(shows)
    .enter()
    .append("circle")
    .attr("cx", 530)
    .attr("cy", (d, i) => 350 + i * 25)
    .attr("r", 10)
    .style("fill", d => colorScale(d))
    .style("stroke", "black")
   

svg.append("g")
    .selectAll("text")
    .data(shows)
    .enter()
    .append("text")
    .attr("x", 550)
    .attr("y", (d, i) => 355 + i * 25)
    .style("fill", "black")
    .text(d => d);
}