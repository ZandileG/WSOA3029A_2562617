//Fetches my API data
fetch("https://api.tvmaze.com/shows/49/episodes")
    .then(function(response){
        return response.json();
    })

    .then(function(data){
    //This is the number of episodes in the series
    const totalEpisodes = data.length;

    //Maps each episode with its rating
    const episodes = data.map((episode, index) => {
        return{
            episodeNumber: index + 1, 
            rating: episode.rating.average
        };
    });
    
    //Runs the function to create the graph
    createGraph(episodes, totalEpisodes);
});

//Create the graph
function createGraph(data, totalEpisodes){
    let HEIGHT = 600,
        WIDTH = 600,
        MARGIN = 80;

//Adds the svg in the div element that has the class graph in my Episodes page
let svg = d3
        .select(".graph")
        .append("svg")
        .attr("height", HEIGHT + MARGIN + MARGIN)
        .attr("width", WIDTH + MARGIN + MARGIN)
        .append("g")
        .attr("transform", `translate(${MARGIN}, ${MARGIN})`);

//Creating the axes
let xScale = d3.scaleLinear().domain([1, totalEpisodes]).range([0, WIDTH]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${HEIGHT})`)
    .call(d3.axisBottom(xScale))
    .call(g => {
        g.append("text")
         .style("fill", "black")
         .text("Episodes")
         .attr("font-size", "1rem")
         .attr("font-family", "Nunito")
         .attr("x", WIDTH / 2)
         .attr("y", 50)
    });

let yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.rating)]).range([HEIGHT, 0]);
  svg
    .append("g")
    .call(d3.axisLeft(yScale))
    .call(g => {
        g.append("text")
         .style("fill", "black")
         .text("Ratings")
         .attr("font-size", "1rem")
         .attr("font-family", "Nunito")
         .attr("transform", `translate(-40, ${HEIGHT / 2}) rotate(-90)`)
    });

let colorScale = d3
    .scaleOrdinal()
    .domain(["Season 1", "Season 2", "Season 3", "Season 4", "Season 5", "Season 6", "Season 7"])
    .range(d3.schemeCategory10);

//Creating the circles
    svg
      .selectAll(".circles")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.episodeNumber))
      .attr("cy", d => yScale(d.rating))
      .attr("r", 4)
      .style("fill", "steelblue")
      .on("mouseover", (e, datum) => showTooltip(datum))
      .on("mousemove", moveTooltip)
      .on("mouseout", removeTooltip);
}

//Creating the tooltip
let tooltip = d3.select(".graph")
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
    tooltip.style("opacity", 1).html(datum.rating);
    tooltip.style("left", d3.pointer(event)[0] +30 + "px");
    tooltip.style("top", d3.pointer(event)[1] - 640 + "px");
}


function moveTooltip(){
    tooltip.style("left", d3.pointer(event)[0] +30 + "px");
    tooltip.style("top", d3.pointer(event)[1] - 640 + "px");
}

function removeTooltip(){
    tooltip.style("opacity", 0);
}

//Creating the legend
const seasons = ["Season 1", "Season 2", "Season 3", "Season 4", "Season 5", "Season 6", "Season 7"];
svg.append("g")
   .selectAll()
   .data(seasons)
   .enter()
   .append("circle")
   .attr("cx", 800)
   .attr("cy", (d, i) => {
        return 350 + i * 25;
   })   
   .attr("r", 10)   
   .style("fill", (d) => colorScale(d))   
   .style("stroke", "#000")
   .on("mouseover", (e, datum) => highlight(datum))
   .on("mouseout", (e, datum) => removeHighlight(datum));

   svg.append("g")
      .selectAll()
      .data(seasons)
      .enter()
      .append("text")
      .attr("x", 820)
      .attr("y", (d, i) => {
           return 355 + i * 25;
      })   
      .style("fill", "black")   
      .text((d) => d);

function highlight(data){
    d3.selectAll(".circles").style("opacity", 0.2);
    d3.selectAll("." + data).style("opacity", 1);
}

function removeHighlight(data){
    d3.selectAll(".bubbles").style("opacity", 1);
}

