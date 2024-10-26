//Back to top button
//Get the reference to the button
let topBtn = document.querySelector(".back-to-top");

window.onscroll = function(){
//Run the function
  scrollFunction()
};

//When the user scrolls down the top button will appear 
function scrollFunction(){
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
    topBtn.style.display = "block";
  } 
  else{
    topBtn.style.display = "none";
  }
}

//When the user clicks on the button, the page will scroll to the top
topBtn.addEventListener("click", function(){
  window.scrollTo({ 
      top: 0, 
      behavior: "smooth"
  });
});