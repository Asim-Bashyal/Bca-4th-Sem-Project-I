let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

const setLoginCredentialsInLS=()=>{
    localStorage.setItem("hasLoggedIn",true)
}

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
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Input validation
    if (!name || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all fields.",
      });
    } else if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a valid email.",
      });
    } else {
      axios
        .post("http://127.0.0.1:8000/signup", {
          name: name,
          email: email,
          password: password,
        })
        .then(function (response) {
          Swal.fire({
            icon: "success",
            title: "Message",
            text: response.data.message,
          });
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Message",
            text: error.response
              ? error.response.data.detail
              : "An unexpected error occurred",
          });
        });
    }
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
            setLoginCredentialsInLS();
            window.location.href ="/frontend/slide.html";  // Correct the path here if needed
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

function togglePassword() {
    var passwordInput = document.getElementById('password');
    var passwordIcon = document.getElementById('passwordIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.innerHTML = '<path d="M12 3.5c-7.333 0-11.25 7.5-11.25 7.5s3.917 7.5 11.25 7.5 11.25-7.5 11.25-7.5-3.917-7.5-11.25-7.5zM2.803 12A8.718 8.718 0 0 1 12 5.5c4.31 0 7.683 3.592 8.697 6.5-.996 2.909-4.369 6.5-8.697 6.5S3.8 14.91 2.803 12zm9.197 1.5c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3zm0-1.5a1.5 1.5 0 1 1 0-3c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5z"/>';
    } else {
        passwordInput.type = 'password';
        passwordIcon.innerHTML = '<path d="M12 4.5c-7.333 0-11.25 7.5-11.25 7.5s3.917 7.5 11.25 7.5 11.25-7.5 11.25-7.5-3.917-7.5-11.25-7.5zm0 13.5c-2.448 0-4.5-2.052-4.5-4.5s2.052-4.5 4.5-4.5 4.5 2.052 4.5 4.5-2.052 4.5-4.5 4.5zm0-7.5a3 3 0 0 0 0 6c1.654 0 3-1.346 3-3s-1.346-3-3-3zm0-1.5c2.484 0 4.5 2.016 4.5 4.5s-2.016 4.5-4.5 4.5-4.5-2.016-4.5-4.5 2.016-4.5 4.5-4.5z"/>';
    }
}

