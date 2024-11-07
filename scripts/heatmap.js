//Fetches my API data
//The API has Brooklyn Nine-Nine Data
fetch("https://api.tvmaze.com/shows/49/episodes")
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        //Total number of episodes in the show
        const totalEpisodes = data.length;

        //Maps each episode with its rating and season
        const episodes = data.map((episode, index) => {
            return{
                episodeNumber: index + 1, 
                rating: episode.rating.average,
                season: episode.season
            };
        });

        //Runs the function
        createMap(episodes, totalEpisodes);
    });

//get data
d3.json("data.json").then((data)=> {
    baseTemp = data.baseTemperature;
    monthlyVar = data.monthlyVariance;

    createScales();
    createHeatmap(monthlyVar);
    });

let xScale;
    let yScale;
    
    let minYear;
    let maxYear;
    
    let baseTemp;
    let monthlyVar;

let svg = d3
.select(".heatmap")
.attr("height", HEIGHT)
.attr("width", WIDTH);

//create scales and axes
function createScales(){
    minYear = d3.min(monthlyVar, (d)=> d.year);
    maxYear = d3.max(monthlyVar, (d)=> d.year);
    
    xScale = d3
    .scaleLinear()
    .domain([minYear, maxYear])
    .range([PADDING, WIDTH - PADDING]);
    
    yScale = d3
    .scaleTime()
    .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
    .range([PADDING, HEIGHT - PADDING]);

    svg
    .append("g")
    .call(d3.axisBottom(xScale).tickFormat(d3.format(".0f")))
    .attr("transform", `translate(0, ${HEIGHT - PADDING})`);
    
    svg
    .append("g")
    .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%b")))
    .attr("transform", `translate(${PADDING}, 0)`);
}

//create the heatmap
function setFill(d){
    if (d.variance <= -1){
        return "steelblue";
    } 
    else if(d.variance <= 0){
        return "lightsteelblue";
    }
    else if(d.variance <= 1){
        return "orange";
    } else{
        return "crimson";
    }
}

function createHeatmap(data){
    svg
    .selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("height", (HEIGHT- 2 * PADDING) / 12)
    .attr("width", () =>{
            let noOfYears = maxYear - minYear;
            return (WIDTH - 2 * PADDING) / noOfYears;
    })
    .attr("x", (d)=> xScale(d.year))
    .attr("y", (d)=> yScale(new Date(0, d.month - 1, 0, 0, 0, 0, 0)))
    .style("fill", d => setFill(d));
} 

//Creating the map
function createMap(data, totalEpisodes){
    let HEIGHT = 600,
        WIDTH = 600,
        MARGIN = 80;

    //Adding the svg in the div element that has the class map in my Episodes page
    let svg = d3.select(".map")
        .append("svg")
        .attr("height", HEIGHT + MARGIN + MARGIN)
        .attr("width", WIDTH + MARGIN + MARGIN)
        .append("g")
        .attr("transform", `translate(${MARGIN}, ${MARGIN})`);

    //Creating the axes
    let xScale = d3.scaleLinear().domain([1, totalEpisodes]).range([0, WIDTH]);
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

    //The episodes will be coloured according to their seasons
    let colorScale = d3.scaleOrdinal()
        .domain([1, 2, 3, 4, 5, 6, 7, 8])
        .range(d3.schemeCategory10);

    //Creating the circles  
    svg.selectAll(".circles")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.episodeNumber))
        .attr("cy", d => yScale(d.rating))
        .attr("r", 4)
        .style("fill", d => colorScale(d.season))
        .attr("class", d => "circles season-" + d.season)
        .on("mouseover", (e, datum) => showTooltip(e, datum))
        .on("mousemove", moveTooltip)
        .on("mouseout", removeTooltip);

    //Creating the tooltip 
    let tooltip = d3.select(".map")
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

    function showTooltip(e, datum){
        tooltip.style("opacity", 1).html(datum.rating);
        tooltip.style("left", e.pageX + 10 + "px");
        tooltip.style("top", e.pageY - 50 + "px");
    }

    function moveTooltip(e){
        tooltip.style("left", e.pageX + 10 + "px");
        tooltip.style("top", e.pageY - 50 + "px");
    }

    function removeTooltip(){
        tooltip.style("opacity", 0);
    }

    //Creating the legend
    const seasons = [1, 2, 3, 4, 5, 6, 7, 8];
    svg
    .append("g")
    .selectAll("circle")
    .data(seasons)
    .enter()
    .append("circle")
    .attr("cx", 530)
    .attr("cy", (d, i) => 350 + i * 25)
    .attr("r", 10)
    .style("fill", d => colorScale(d))
    .style("stroke", "black")
    .on("mouseover", (e, season) => highlight(season))
    .on("mouseout", removeHighlight);

    svg
    .append("g")
    .selectAll("text")
    .data(seasons)
    .enter()
    .append("text")
    .attr("x", 550)
    .attr("y", (d, i) => 355 + i * 25)
    .style("fill", "black")
    .text(d => "Season " + d);
}