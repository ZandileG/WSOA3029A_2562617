/*//This is a sidebar that is only visible in the mobile version of my website
//Get references to the "X" icon, the burger icon, and the sidebar
const closeBtn = document.querySelector(".close-btn");
const sidebarBtn = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector(".show-sidebar");

//When the sidebarbtn is clicked, the sidebar will appear and when the closeBtn is clicked, it will close
closeBtn.addEventListener("click", function(){
 sidebar.style.display = "none";
});

sidebarBtn.addEventListener("click", function(){
  sidebar.style.display = "block";
});*/

//Functionality for the return to top button
document.querySelector(".back-to-top").addEventListener("click", function(){
  window.scrollTo({ 
      top: 0, 
      behavior: "smooth"
  });
});