//I used the menu code from my Semester 1 website. We were given a tutorial in class by Hanli for how to do it.
//Nav Menu
const root = "/WSOA3029A_2562617";

//An array of all the menu items
const menuItems = [
    { name: "Home", href: root + "/index.html" },
    { name: "About", href: `${root}/about/about.html` },
    { name: "Characters", href: `${root}/content/characters.html` },
    { name: "Episodes", href: `${root}/content/episodes.html` },
    { name: "Fan Art", href: `${root}/content/fan-art.html` },
    { name: "Design", href: `${root}/design/design.html` },
    { name: "Theory", href: `${root}/theory/theory.html` },
];

//Function for the nav menu
export function initialiseMenu (currentPage){
    const nav = document.querySelector("header > nav");
    const ul = document.createElement("ul");
    ul.classList.add("menu");

    //When the user is on a page its nav menu list item will not be underlined
    for (let menuItem of menuItems) {
        const li = document.createElement("li");
        li.classList.add("menu-item");
        if (currentPage !== menuItem.name) {
            const a = document.createElement("a");
            a.innerText = menuItem.name;
            a.setAttribute("href", menuItem.href);
            li.appendChild(a);
        } else {
            li.innerText = menuItem.name;
            li.classList.add("active");
        }
        ul.appendChild(li);
    }
    nav.appendChild(ul);
};

//Function to create next and back buttons for each page
//I'm not sure if there is an easier way to do this cause I wrote a lot of lines of code but I'm glad it works
function createNavButtons(backTarget, nextTarget){
    const buttonContainer = document.getElementById("button-container");

    //Creates a back button
    const backButton = document.createElement("button");
    backButton.setAttribute("id", "back");
    backButton.setAttribute("data-target", backTarget);
    
    //This is the image that will appear on the back button
    const backImage = document.createElement("img");
    backImage.setAttribute("src", "../images/arrow-left.png");
    backImage.setAttribute("class", "button");
    
    //Makes the image appear on the button
    backButton.appendChild(backImage);
    
    //Creates a next button
    const nextButton = document.createElement("button");
    nextButton.setAttribute("id", "next");
    nextButton.setAttribute("data-target", nextTarget);
    
    //This is the image that will appear on the next button
    const nextImage = document.createElement("img");
    nextImage.setAttribute("src", "../images/arrow-right.png");
    nextImage.setAttribute("class", "button");
    
    //Makes the image appear on the button
    nextButton.appendChild(nextImage);
    
    //Adds these buttons inside the button container in the html pages
    buttonContainer.appendChild(backButton);
    buttonContainer.appendChild(nextButton);

    //Event listeners for the button functionality
    backButton.addEventListener("click", function(){
        window.location.href = backButton.getAttribute("data-target");
    });
    
    nextButton.addEventListener("click", function(){
        window.location.href = nextButton.getAttribute("data-target");
    });
};

//Button functionality for the different pages
document.addEventListener("DOMContentLoaded", function(){

    if (window.location.pathname.endsWith("design/design.html")){
        createNavButtons("../content/fan-art.html", "../theory/theory.html");
    }
    
    if (window.location.pathname.endsWith("theory/theory.html")){
        createNavButtons("../design/design.html", "../index.html");
    }
    
    if (window.location.pathname.endsWith("content/characters.html")){
        createNavButtons("../about/about.html", "episodes.html");
    }
    
    if (window.location.pathname.endsWith("content/episodes.html")){
        createNavButtons("characters.html", "fan-art.html");
    }
    
    if (window.location.pathname.endsWith("content/fan-art.html")){
        createNavButtons("episodes.html", "../design/design.html");
    }
    
    if (window.location.pathname.endsWith("about/about.html")){
        createNavButtons("../index.html", "../content/characters.html");
    }
});

//The menu opens when the open button is clicked and it closes when the close button is clicked
document.querySelector(".menu").addEventListener("click", function() {
    const nav = document.querySelector(".nav");
    const closeButton = document.querySelector(".close");
    const openButton = document.querySelector(".open");

    if (nav.style.display === "block") {
        nav.style.display = "none";
        closeButton.style.display = "none";
        openButton.style.display = "block";
    } else {
        nav.style.display = "block";
        closeButton.style.display = "block";
        openButton.style.display = "none";
    }
});



