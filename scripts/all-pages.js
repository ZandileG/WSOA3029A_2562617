/*//Nav Menu
const root = "/WSOA3029A_2562617"

//An array of all the menu tabs
const menuItems = [
    { name: "Home", href: root + "/index.html" },
    { name: "About", href: `${root}/about/about.html` },
    { name: "Theory", href: `${root}/theory/theory.html` },
    { name: "Essay", href: `${root}/theory/essay.html` },
    { name: "Design", href: `${root}/design/design.html` },
    { name: "Content", href: `${root}/content/content.html` },
    { name: "Data-Visualisations", href: `${root}/data-visualisations/data-visualisations.html` },
]*/

//Nav Menu
//An array of all the menu tabs
const menuItems = [
    { name: "Home", href: "/index.html" },
    { name: "About", href: `/about/about.html` },
    { name: "Theory", href: `/theory/theory.html` },
    { name: "Essay", href: `/theory/essay.html` },
    { name: "Design", href: `/design/design.html` },
    { name: "Content", href: `/content/content.html` },
    { name: "Data-Visualisations", href: `/data-visualisations/data-visualisations.html` },
]

//Function for the nav menu
export function initialiseMenu (currentPage) {
    const nav = document.querySelector("header > nav");
    const ul = document.createElement("ul");
    ul.classList.add("menu");

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
}

//Next and Back buttons
//When you click on them, it gets the data target attribute from the button and changes the page
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("button[data-target]").forEach(function(button) {
        button.addEventListener("click", function() {
            window.location.href = button.getAttribute("data-target");
        });
    });
});

/*Interactivity — elements such as sliders, carousels, and animations, etc. to create interactivity and smooth animations for scrolling, transitions, and other effects, enhancing the visual appeal of a website.*/
