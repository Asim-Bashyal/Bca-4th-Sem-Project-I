let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

signinBtn.onclick = function () {
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");

    func()

}

signupBtn.onclick = function () {
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");

    signUp()
}


function signUp() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    axios.post('http://127.0.0.1:8000/signup', {
        "name": name,
        "email": email,
        "password": password
    })
      .then(function (response) {
        Swal.fire({
            icon: "success",
            title: "Message",
            text: response.data.message
          });
      })
      .catch(function (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: "Message",
            text: error.response.data.detail
          });
      });
}

function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if fields are filled
    if (!email || !password) {
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'Email and password are required!',
        // });
        return;
    }

    axios.post('http://127.0.0.1:8000/signin', {
        "email": email,
        "password": password
    })
    .then(function (response) {
        Swal.fire({
            icon: "success",
            title: "Message",
            text: response.data.message || "Signin successful!"
        }).then(() => {
            window.location.href ="/slide_front_frontend/slide.html";  // Correct the path here if needed
        });
        
        // Optionally, you can redirect or perform another action on successful signin
    })
    .catch(function (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Message",
            text: error.response ? error.response.data.detail : "Signin failed!"
        });
    });
}

// Event listener for the sign in button
document.getElementById('signinBtn').addEventListener('click', signIn);


//click here
document.getElementById("clickhere").addEventListener("click", function() {
    window.open ("forgetpass.html");
})


