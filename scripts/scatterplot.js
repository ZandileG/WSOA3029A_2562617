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
        createGraph(episodes, totalEpisodes);
    });

//Creating the graph
function createGraph(data, totalEpisodes){
    let HEIGHT = 600,
        WIDTH = 600,
        MARGIN = 80;

    //Adding the svg in the div element that has the class graph in my Episodes page
    let svg = d3.select(".graph")
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

    //When the user hovers over a season in the legend, the episodes from that season will be highlighted
    function highlight(season) {
        d3.selectAll(".circles").style("opacity", 0.2);
        d3.selectAll(".season-" + season).style("opacity", 1);
    }

    function removeHighlight() {
        d3.selectAll(".circles").style("opacity", 1);
    }
}