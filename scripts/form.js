//Newsletter Subscription Form
function enterName(){
const userName = document.getElementById("name").value;
const validName = document.getElementById("validName");

//If the user doesn't enter any numbers or symbols, their input will be accepted
  //I learnt the letter characters: /^[a-zA-Z\s]+$/ from this website "https://www.javatpoint.com/javascript-form"
  if (/^[a-zA-Z\s]+$/.test(userName)){
    validName.checked = true; 
  } else{
  alert("You can only use letters!");  
    validName.checked = false; 
  //Removes the user's incorrect input
    document.getElementById("name").value = "";
  }
}

function enterEmail(){
  const userEmail = document.getElementById("email").value;
  const validEmail = document.getElementById("validEmail");

  //If the user enters a valid email format, their input will be accepted
  //I learnt these email characters from this website "https://www.javatpoint.com/javascript-form"
  if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(userEmail)){
    validEmail.checked = true; 
  } else{
    alert("You did not enter a valid email format!");  
    validEmail.checked = false; 
  //Removes the user's incorrect input
    document.getElementById("email").value = "";
    }
}

function enterNumber(){
  const userNumber = document.getElementById("number").value;
  const validNumber = document.getElementById("validNumber");

//If the user enters 10 numbers, their input will be accepted
  if (!isNaN(userNumber) && userNumber.length === 10){
    validNumber.checked = true;
  } else{
    alert("You can only enter 10 numerical digits!");  
    validNumber.checked = false; 
  //Removes the user's incorrect input
  document.getElementById("number").value = "";
  }
}

//The user can create a password to access the newsletter
function enterPassword(){
  const userPassword = document.getElementById("password").value;
  const validPassword = document.getElementById("validPassword");

//The password must be 5 characters long
  if(userPassword.length === 5){

//I want the password to appear as dots after it is saved.
    document.getElementById("password").value = "•••••";
    validPassword.checked = true;
    alert("Your password is successfully saved!");  
  } else{
    alert("Your password can only be 5 characters long!"); 
  //Clear the text field when the save button is pressed
    document.getElementById("password").value = "";
  }
}

//The user can contact me by writing a message into the Message text field.
function enterMessage(){
  const userMessage = document.getElementById("message").value;

  if(!userMessage.length > 50){
    alert("Your message can only be 50 characters long!");  
  }
}

//This is the function for the Submit button. When it is clicked, the code will check if the user wrote something.
function submit(){
  const userMessage = document.getElementById("message").value;
  const ticks = document.querySelectorAll(".checkmark");

//If nothing is written, the error message will appear.
if (userMessage.trim() === ""){
  alert("Please enter a message!");  
} else{ 
//This is the response that the user will get after submitting the form.
  alert("You are now subscribed to my Brooklyn Nine-Nine newsletter!");  
//Clear all the text fields when the form is submitted
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("number").value = "";
  document.getElementById("password").value = "";
  document.getElementById("message").value = "";

//Remove the ticks
  ticks.forEach(tick => {
    tick.style.display = "none";
  });
} 
}

/*The user has to enter their information in the order that the form presents. 
  If there is text field that is empty, an error alert will appear.*/
function errorMessage(){
  const userName = document.getElementById("name").value;
  //If nothing is written, the error message will appear.
  if (userName.trim() === ""){
    alert("Please enter your name first!");  
  } 
}

function errorMessage1(){
  const userEmail = document.getElementById("email").value;

  if (userEmail.trim() === ""){
    alert("Please enter your email first");  
  } 
}

function errorMessage2(){
  const userNumber = document.getElementById("number").value;

  if (userNumber.trim() === ""){
    alert("Please enter your phone number first!");  
  } 
}

function errorMessage3(){
  const userPassword = document.getElementById("password").value;

  if (userPassword.trim() === ""){
    alert("Please enter your password first!");  
  } 
}