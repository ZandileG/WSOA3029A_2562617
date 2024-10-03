import { characters } from "./characters.js";
let currentCharacter = 0;

//Gets references to the html elements
const flipButton = document.querySelector(".corner");
const characterContainer = document.querySelector(".character");
const characterName = document.querySelector(".character-name");
const characterImage = document.querySelector(".character-image");
const portrayedBy = document.querySelector(".actor");
const occupation = document.querySelector(".role");
const personality = document.querySelector(".desc");
const quote = document.querySelector(".quote");

//When the page flip button is clicked, the character information will change
flipButton.addEventListener("click", function(){
  characterContainer.classList.add("flip-animation");

  characterContainer.addEventListener("animationend", () => {
  characterContainer.classList.remove("flip-animation");

//Updates the text using the data from the characters script
  currentCharacter = (currentCharacter + 1) % characters.length;

  characterName.textContent = characters[currentCharacter].name;
  characterImage.src = characters[currentCharacter].image;
  portrayedBy.textContent = characters[currentCharacter].portrayedBy;
  occupation.textContent = characters[currentCharacter].occupation;
  personality.textContent = characters[currentCharacter].personality;
  quote.textContent = characters[currentCharacter].quote;

//When the button has been clicked, the update will happen
}, { once: true }); 
});
    