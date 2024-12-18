//Reading progress bar 
/*As the reader scrolls through the page, the progress bar will move up.
  When the reader is done scrolling, the bar will be full and when they scroll up, it will move back.*/
  document.addEventListener("DOMContentLoaded", function(){
    
    window.onscroll = function(){ 
//Runs the functions
        updateProgressBar(); 
        scrollFunction(); 
    };

//Functionality for the progress bar 
    function updateProgressBar(){
        let winScroll = window.pageYOffset || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    }

//Functionality for the Back to top button 
    let topBtn = document.querySelector(".back-to-top");

    function scrollFunction(){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
            topBtn.style.display = "block";
        } 
        else{
            topBtn.style.display = "none";
        }
    }

//When the user clicks the button, the page will scroll to the top
    topBtn.addEventListener("click", function(){
        window.scrollTo({ 
            top: 0, 
            behavior: "smooth" 
        });
    });
});

//Animate images 
//Changes the scale of the image for 0.2seconds when the user hovers over the image and goes back when they are not hovering
const images = document.querySelectorAll(".image");

images.forEach(image => {
    image.addEventListener("mouseenter", function(){
        this.style.transform = "scale(1.1)";
        this.style.transition = "transform 0.2s";
    });

    image.addEventListener("mouseleave", function(){
        this.style.transform = "scale(1)";
        this.style.transition = "transform 0.2s";
    });
});

//Welcome Message
//These messages appear 2.5 seconds after each other
const messages = [
  "Welcome to my fan website for Brooklyn Nine-Nine!",
  "I hope you enjoy the content I am bringing to you.",
  "Are you ready to become a new member of the 99th precinct?"
];

let index = 0;

//Functionality for the messages' appearances
const displayMessage = function(){
  if (index < messages.length){
      const heading = document.getElementById("Message");
      
      heading.innerHTML = messages[index];
      index++;
      setTimeout(displayMessage, 2500);
  }
};

//Run the function
displayMessage();