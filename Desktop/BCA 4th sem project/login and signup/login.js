let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

signinBtn.onclick = function(){
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");


}

signupBtn.onclick = function(){
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}
function func(){
 var email = document.getElementById('username').value;
 var pass = document.getElementById('Password').value;
 if(email == 'asimbashyal13@gmail.com' && pass == 'password'){
    alert("Successfully login")
    window.location.assign("index.html")
 }
 else{
    alert("Incorrect Password")
 }
}
