//Newsletter Subscription Form
//Get references to the text field elements
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userNumber = document.getElementById("number");
const userPassword = document.getElementById("password");
const userMessage = document.getElementById("message");
const submitBtn = document.querySelector(".submit");

userName.addEventListener("change", function(){
const validName = document.getElementById("validName");

//If the user doesn't enter any numbers or symbols, their input will be accepted
  if (/^[a-zA-Z\s]+$/.test(userName.value)){
    validName.checked = true; 
  } else{
    alert("You can only use letters!");  
    validName.checked = false; 

  //Removes the user's incorrect input
    document.getElementById("name").value = "";
  }
});

userEmail.addEventListener("change", function(){
  const validEmail = document.getElementById("validEmail");

  //If the user enters a valid email format, their input will be accepted
  //I learnt these email characters from this website "https://www.javatpoint.com/javascript-form"
  if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(userEmail.value)){
    validEmail.checked = true; 
  } else{
    alert("You did not enter a valid email!");  
    validEmail.checked = false; 
    document.getElementById("email").value = "";
    }
});

userNumber.addEventListener("change", function(){
  const validNumber = document.getElementById("validNumber");

//If the user enters 10 numbers, their input will be accepted
  if (!isNaN(userNumber.value) && userNumber.value.length === 10){
    validNumber.checked = true;
  } else{
    alert("You can only enter 10 numerical digits!");  
    validNumber.checked = false; 
    document.getElementById("number").value = "";
  }
});

//The user can create a password to access the newsletter
userPassword.addEventListener("change", function(){
  const validPassword = document.getElementById("validPassword");

//The password must be 5 characters long
  if(userPassword.value.length === 5){

//I want the password to appear as dots after it is saved.
    document.getElementById("password").value = "•••••";
    validPassword.checked = true;
    alert("Your password has been successfully saved!");  
  } else{
    alert("Your password can only be 5 characters long!"); 
    document.getElementById("password").value = "";
  }
});

//The user can contact me by writing a message into the Message text field.
userMessage.addEventListener("change", function(){
  if(userMessage.value.length > 50){
    alert("Your message cannot be longer than 50 characters!");  
  }
});

/*This is the function for the Submit button. When it is clicked, 
the code will check if the user wrote something and accept their input 
if it meets the requirements below.*/
submitBtn.addEventListener("click", function(){
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
});

/*The user has to enter their information in the order that the form presents. 
  If there is text field that is empty, an error alert will appear.*/
  userEmail.addEventListener("click", function(){
  if (userName.value.trim() === ""){
    alert("Please enter your name first!");  
  } 
});

userNumber.addEventListener("click", function(){
  if (userEmail.value.trim() === ""){
    alert("Please enter your email first!");  
  } 
});

userPassword.addEventListener("click", function(){
  if (userNumber.value.trim() === ""){
    alert("Please enter your phone number first!");  
  } 
});

userMessage.addEventListener("click", function(){
  if(userName.value.trim() === ""){
    alert("Please enter your information first!");  
  }

  else if(userEmail.value.trim() === ""){
    alert("Please enter your email!");  
  }

  else if(userNumber.value.trim() === ""){
    alert("Please enter your phone number!");  
  }

  else if(userPassword.value.trim() === ""){
    alert("Please enter your password!");  
  }
});