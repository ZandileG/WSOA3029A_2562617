/*//Fetches my API data
//The API has Brooklyn Nine-Nine Data
fetch("https://api.tvmaze.com/shows/49/episodes")
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        //Total number of episodes in the show
        const totalEpisodes = data.length;
        const seasons = [...new Set(data.map(episode => episode.season))];

        //Maps each episode with its rating and season
        const episodes = data.map((episode) => ({
                episodeNumber: episode.number, 
                rating: episode.rating.average,
                season: episode.season
        }));

        //Runs the function
        createMap(episodes, seasons, totalEpisodes);
        createScales(seasons);
    });

//Creating the map
function createMap(data, seasons, totalEpisodes){
    let HEIGHT = 600,
        WIDTH = 800,
        MARGIN = 80;

//Adding the svg in the div element that has the class map in my Episodes page
const svg = d3.select(".heatmap")
            .append("svg")
            .attr("height", HEIGHT + MARGIN + MARGIN)
            .attr("width", WIDTH + MARGIN + MARGIN)
            .append("g")
            .attr("transform", `translate(${MARGIN}, ${MARGIN})`);

    svg
    .selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.season)+ xScale.bandwidth() / 2 - 10)
    .attr("y", d => yScale(d.rating))
    .attr("width", 20)
    .attr("height", d => HEIGHT - yScale(d.rating))
    .style("fill", d => setFill(d.rating))
    .on("mouseover", (e, datum) => showTooltip(e, datum))
    .on("mousemove", moveTooltip)
    .on("mouseout", removeTooltip);

//Creating the tooltip 
    let tooltip = d3.select(".heatmap")
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

//Creating the axes
    let xScale = d3.scaleBand().domain(seasons).range([0, WIDTH]).padding(0.1);
    let yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.rating)]).range([HEIGHT, 0]);

//Creating the scales
function createScales(seasons){
    svg.append("g")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    svg.append("g")
        .call(d3.axisLeft(yScale).ticks(10));

    svg.append("text")
        .style("fill", "black")
        .text("Seasons")
        .attr("font-size", "1rem")
        .attr("font-family", "Nunito")
        .attr("x", WIDTH / 2)
        .attr("y", HEIGHT + MARGIN / 2);

    svg.append("text")
             .style("fill", "black")
             .text("Ratings")
             .attr("font-size", "1rem")
             .attr("font-family", "Nunito")
             .attr("transform", "rotate(-90)")
             .attr("x", -MARGIN / 2)
             .attr("y", HEIGHT / 2);
    }
}

//Filling in the colours for each rating
function setFill(rating){
    if (rating < 6){
        return "grey";
    } 
    else if(rating >= 6){
        return "brown";
    }
    else if(rating >= 8){
        return "orange";
    } else{
        return "yellow";
    }
}*/

        fetch('https://api.tvmaze.com/shows/49/episodes')
        .then(response => response.json())
        .then(episodes => {
          const formattedData = formatData(episodes);
          createHeatmap(formattedData);
        });
      
      function formatData(episodes) {
        // Group episodes by season
        const seasons = {};
      
        episodes.forEach(episode => {
          const season = episode.season;
          const episodeNumber = episode.number;
          const rating = episode.rating ? episode.rating.average : 0;
      
          if (!seasons[season]) {
            seasons[season] = [];
          }
      
          seasons[season].push({ episodeNumber, rating });
        });
      
        // Sort episodes within each season
        for (const season in seasons) {
          seasons[season].sort((a, b) => a.episodeNumber - b.episodeNumber);
        }
      
        return seasons;
      }
      
      function createHeatmap(seasons) {
        const margin = { top: 40, right: 40, bottom: 40, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;
      
        // Append the SVG to the div with class "heatmap"
        const svg = d3.select('.heatmap').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
      
        // Get the number of seasons and the maximum number of episodes
        const numSeasons = Object.keys(seasons).length;
        const maxEpisodes = Math.max(...Object.values(seasons).map(season => season.length));
      
        // Define the scales
        const x = d3.scaleBand()
          .domain(d3.range(numSeasons))  // Number of seasons
          .range([0, width])
          .padding(0.05);
      
        const y = d3.scaleBand()
          .domain(d3.range(maxEpisodes))  // Max episodes across all seasons
          .range([height, 0])  // Reverse the y scale so that episode 1 is at the bottom
          .padding(0.05);
      
        // Define the custom color scale based on rating thresholds
        function getColor(rating) {
          if (rating <= 5) {
            return "lightorange"; // Light orange for rating <= 6
          } else if (rating <= 7) {
            return "orange"; // Orange for rating <= 7
          } else if (rating <= 8) {
            return "red"; // Red for rating <= 8
          } else {
            return "blue"; // Blue for rating > 8
          }
        }
      
        // Create the heatmap cells
        svg.selectAll('.cell')
          .data(Object.keys(seasons).flatMap(season => {
            return seasons[season].map(episode => ({
              season,
              episodeNumber: episode.episodeNumber,
              rating: episode.rating
            }));
          }))
          .enter().append('rect')
          .attr('x', d => x(d.season - 1))  // Map season to x (width)
          .attr('y', d => y(d.episodeNumber - 1))  // Map episode number to y (height)
          .attr('width', x.bandwidth())
          .attr('height', y.bandwidth())
          .style('fill', d => getColor(d.rating))  // Apply custom color based on rating
          .style('stroke', 'white')
          .style('stroke-width', 0.5);
      
        // Add x-axis (season numbers)
        svg.selectAll('.x-axis')
          .data(x.domain())
          .enter().append('g')
          .attr('transform', d => `translate(${x(d)},0)`)
          .each(function(d) {
            d3.select(this).append('text')
              .attr('y', height + 10)
              .attr('x', x.bandwidth() / 2)
              .attr('text-anchor', 'middle')
              .text(d => `Season ${d + 1}`);  // Season labels (1-based)
          });
      
        // Add y-axis (episode numbers), reversed so episode 1 is at the bottom
        svg.selectAll('.y-axis')
          .data(y.domain())
          .enter().append('g')
          .attr('transform', d => `translate(0,${y(d)})`)
          .each(function(d) {
            d3.select(this).append('text')
              .attr('x', -10)
              .attr('y', y.bandwidth() / 2)
              .attr('dy', '.35em')
              .attr('text-anchor', 'middle')
              .text(d => d + 1);  // Episode numbers (1-based)
          });
      }
      