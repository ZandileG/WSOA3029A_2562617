//Functionality for the return to top button
document.querySelector(".back-to-top").addEventListener("click", function(){
  window.scrollTo({ 
      top: 0, 
      behavior: "smooth"
  });
});