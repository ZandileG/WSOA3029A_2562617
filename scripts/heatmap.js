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
        createScales();
    });

let svg = d3
.select(".heatmap")
.attr("height", HEIGHT)
.attr("width", WIDTH);

//create scales and axes
function createScales(){
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

    svg
    .append("g")
    .call(d3.axisBottom(xScale).tickFormat(d3.format(".0f")))
    .attr("transform", `translate(0, ${HEIGHT - MARGIN})`);
    
    svg
    .append("g")
    .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%b")))
    .attr("transform", `translate(${MARGIN}, 0)`);
}

//create the heatmap
function setFill(d){
    if (d.rating <= -1){
        return "orange";
    } 
    else if(d.rating <= 0){
        return "yellow";
    }
    else if(d.rating <= 1){
        return "brown";
    } else{
        return "grey";
    }
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

    //Creating the circles  
    svg
    .selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d)=> xScale(d.rating))
    .attr("y", (d)=> yScale(d.seasons))
    .style("fill", d => setFill(d))
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
}