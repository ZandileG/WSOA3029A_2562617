//Contact Form
/*The user can contact me by writing a message into the text field from my About page.*/

//This is the function for the Submit button. When it is clicked, the code will check if the user wrote something.
function submitForm(){
    const contactMessage = document.getElementById("contactMessage").value;
    const responseMessage = document.getElementById("responseMessage");

  //If nothing is written, the error message will appear in red. If something is written, the response will appear in purple.
    if (contactMessage.trim() === ""){
        responseMessage.textContent = "Please enter a message.";
        responseMessage.style.color = "red";
    } else {
        //This is the response that the user will get after submitting the form.
        responseMessage.textContent = "Thank you for your message!";
        responseMessage.style.color = "rgba(100, 73, 58)";

      //Clear the text area when the messageis submitted
        document.getElementById("contactMessage").value = "";
    }
}