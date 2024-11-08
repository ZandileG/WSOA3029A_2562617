//Fetches my API data
//The API has Brooklyn Nine-Nine Data
fetch("https://api.tvmaze.com/shows/49/episodes")
    .then(response => response.json())
    .then(episodes => {
        const seriesData = getData(episodes);
        createHeatmap(seriesData);
    });
      
//Sorting the episodes in each season
    function getData(episodes){
    //This object will hold the episodes that I will group by season
        const seasons = {};
      
    //For each episode it will get the season, episode number and the rating it has
        episodes.forEach(episode => {
          const season = episode.season;
          const episodeNumber = episode.number;
          const rating = episode.rating ? episode.rating.average : 0;
      
    //Creating an array for each season that will contain the episode number and rating
          if (!seasons[season]){
            seasons[season] = [];
          }
      
          seasons[season].push({ episodeNumber, rating });
        });
      
    for (const season in seasons){
        seasons[season].sort((a, b) => a.episodeNumber - b.episodeNumber);
    }
      
        return seasons;
    }

//Function to create the heatmap
    function createHeatmap(seasons){
        const margin = { top: 40, right: 50, bottom: 70, left: 70 };
        const width = 700 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;
      
//Adding the heatmap to the div in my Episodes page
    const svg = d3.select(".heatmap")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
      
//Number of seasons and episodes
    const numSeasons = Object.keys(seasons).length;
    const maxEpisodes = Math.max(...Object.values(seasons).map(season => season.length));
      
//Creating the scales
//I used scaleBand because I wanted to have equal spacing between each cell and row
    const x = d3.scaleBand()
          .domain(d3.range(numSeasons))  
          .range([0, width])
          .padding(0.05);
      
    const y = d3.scaleBand()
          .domain(d3.range(maxEpisodes))  
          .range([height, 0])  
          .padding(0.05);
      
//Colours for the ratings of the episodes
    function getColour(rating){
        if (rating <= 6){
            return "rgb(255, 235, 175)"; 
          } 
          else if (rating <= 7){
            return "rgb(246, 182, 30)"; 
          } 
          else if (rating <= 8){
            return "rgb(223, 118, 11)"; 
          }
          else if (rating > 8){
            return "rgb(116, 60, 8)"; 
          }
          else{
            return "white"; 
          }
        }
      
//Creating the heatmap cells
svg.selectAll(".cell")
    .data(Object.keys(seasons).flatMap(season => {
        return seasons[season].map(episode => ({
        season,
        episodeNumber: episode.episodeNumber,
        rating: episode.rating
        }));
    }))
    .enter()
    .append("rect")
    .attr("x", d => x(d.season - 1)) 
    .attr("y", d => y(d.episodeNumber - 1))  
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .style("fill", d => getColour(d.rating))  
    .style("stroke", "white")
    .style("stroke-width", 0.5)
    .on("mouseover", (e, datum) => showTooltip(e, datum))
    .on("mousemove", moveTooltip)
    .on("mouseout", removeTooltip);
      
//Creating the axes
svg.selectAll(".x-axis")
    .data(x.domain())
    .enter().append("g")
    .attr("transform", d => `translate(${x(d)},0)`)
    .each(function(d){
        d3.select(this).append("text")
          .attr("y", height + 20)  
          .attr("x", x.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .text(d => d + 1);  
        });
      
svg.selectAll(".y-axis")
    .data(y.domain())
    .enter().append("g")
    .attr("transform", d => `translate(0,${y(d)})`)
    .each(function(d){
        d3.select(this).append("text")
          .attr("x", -10)
          .attr("y", y.bandwidth() / 2)
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")
          .text(d => d + 1);  
        });

svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Seasons");  

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 12)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Episodes");

//Creating the tooltip 
//This will show the user what the rating of the episode is when they hover over its cell
    let tooltip = d3.select(".heatmap")
        .append("div")
        .style("color", "black")
        .style("font-weight", "bold")
        .style("background-color", "rgb(236, 226, 226)")
        .style("padding", "0.5rem")
        .style("border-radius", "10%")
        .style("border", "1px solid black")
        .style("position", "absolute")
        .style("width", "5.5rem")
        .style("opacity", 0);

    function showTooltip(e, datum){
        tooltip.style("opacity", 1).html(`Rating: ${datum.rating}`);
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