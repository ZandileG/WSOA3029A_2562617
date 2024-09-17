/*https://api.tvmaze.com/singlesearch/shows?q=brooklyn+nine-nine&embed=episodes
https://api.tvmaze.com/shows/49/seasons
https://api.tvmaze.com/shows/49/episodes*/

/*Two interactive data visualizations (different types of visuals). 
The data visualizations should be surrounded by their appropriate context (UI/UX), 
e.g.: tooltips, legends, maps, keys, explanations/expansion text, titles, etc. */

fetch("https://api.tvmaze.com/singlesearch/shows?q=brooklyn+nine-nine&embed=episodes")
  .then(response => response.json())
  .then(data => console.log(data));
  