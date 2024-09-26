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

    // Send a request to send OTP
    axios.post('http://127.0.0.1:8000/forgetpassword', { email: email })
        .then(response => {
            document.getElementById('message').innerText = response.data.message || "OTP sent to your email.";
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message || 'Check your email for the OTP.',
            });

            // Show OTP input section
            document.getElementById('otpSection').style.display = 'block'; // Show OTP input section
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

document.getElementById('verifyBtn').addEventListener('click', function() {
    const otp = document.getElementById('otpInput').value;

    if (!otp) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please enter the OTP.',
        });
        return;
    }

    // Send OTP for verification
    const email = document.getElementById('email').value; // Capture the email again if needed

    axios.post('http://127.0.0.1:8000/otp', { email: email, otp: otp })
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message || 'OTP verified successfully.',
            });

            // Optionally, you can show password reset section here
            document.getElementById('resetPasswordSection').style.display = 'block'; // Show reset password section
        })
        .catch(error => {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.detail : "Invalid OTP, please try again!",
            });
        });
});
