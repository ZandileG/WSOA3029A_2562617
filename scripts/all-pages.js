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