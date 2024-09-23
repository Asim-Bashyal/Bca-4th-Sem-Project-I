document.getElementById('submitBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;

    if (!email) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please enter your email.',
        });
        return;
    }

    axios.post('http://127.0.0.1:8000/forgotpassword', { email: email })
        .then(response => {
            document.getElementById('message').innerText = response.data.message || "Reset link sent!";
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Check your email for the reset link.',
            });
        })
        .catch(error => {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.detail : "Something went wrong!",
            });
        });
});
