//Newsletter Subscription Form
function enterName(){
const userName = document.getElementById("name").value;
const validName = document.getElementById("validName");

//If the user doesn't enter any numbers or symbols, their input will be accepted
  if (/^[a-zA-Z\s]+$/.test(userName)){
    validName.style.display = "block";
    validName.checked = true; 
  } else{
  alert("You can only use letters not numbers!");  
    validName.style.display = "none";  
    validName.checked = false; 
  //Removes the user's incorrect input
    document.getElementById("name").value = "";
  }
}

function enterEmail(){
  const userEmail = document.getElementById("email").value;
  const validEmail = document.getElementById("validEmail");

  //If the user enters a valid email format, their input will be accepted
  if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(userEmail)){
    validEmail.style.display = "block";
    validEmail.checked = true; 
  } else{
    alert("You did not enter a valid email format!");  
    validEmail.style.display = "none";
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
    validNumber.style.display = "block";
    validNumber.checked = true;
  } else{
    alert("You can only enter 10 numerical digits!");  
    validNumber.style.display = "none";
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
//I want the password to appear as dots after it is saved
    document.getElementById("password").value = "•••••";
    validPassword.style.display = "block";
    validPassword.checked = true;
    alert("Your password is successfully saved!");  
  } else{
    alert("Your password can only be 5 characters long!"); 
    validPassword.style.display = "none"; 
  //Clear the text field when the save button is pressed
    document.getElementById("password").value = "";
  }
}

//The user can save their information. If there is text field that is empty, an error alert will appear.
function saveInfo(){
  const userName = document.getElementById("name").value;
  const userEmail = document.getElementById("email").value;
  const userNumber = document.getElementById("number").value;
  const userPassword = document.getElementById("password").value;
  //If nothing is written, the error message will appear.
  if (userName.trim() === ""){
    alert("Please enter your name!");  
  } 

  if(userEmail.trim() === ""){
    alert("Please enter your email!");  
  }

  if (userNumber.trim() === ""){
    alert("Please enter your phone number!");  
  } 
  
  if(userPassword.trim() === ""){
  } else{
    alert("Please enter your password!");  
  }
}

//The user can contact me by writing a message into the text field from my About page.
//This is the function for the Submit button. When it is clicked, the code will check if the user wrote something.
function submitMessage(){
    const userMessage = document.getElementById("message").value;

  //If nothing is written, the error message will appear.
    if (userMessage.trim() === ""){
        alert("Please enter a message.");  
    } 
    else{
        //This is the response that the user will get after submitting the form.
        alert("Thank you for your message!");  

      //Clear all the text field when the message is submitted
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("number").value = "";
      document.getElementById("message").value = "";
    }
}

