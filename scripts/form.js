//Newsletter Subscription Form
//The user can create a password to access the newsletter
function submitPassword(){
  const userPassword = document.getElementById("password").value;

  //If nothing is written, the error message will appear.
  if (userPassword.trim() === ""){
    alert("Please enter a password.");  
  } 
  else{
    //This is the response that the user will get after submitting the form.
    alert("Password is successfully saved!");  

  //Clear the text area when the message is submitted
    document.getElementById("password").value = "";
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

      //Clear the text area when the message is submitted
        document.getElementById("message").value = "";
    }
}

