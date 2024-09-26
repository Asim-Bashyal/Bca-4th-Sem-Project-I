document.addEventListener('DOMContentLoaded', () => {
    const otpFields = document.querySelectorAll('.otp-field');
    const verifyBtn = document.getElementById('verifyBtn');
    const message = document.getElementById('message');
    const resendLink = document.getElementById('resendLink');

    // Automatically move to the next field on input and focus previous field on backspace
    otpFields.forEach((field, index) => {
        field.addEventListener('input', () => {
            if (field.value.length === 1 && index < otpFields.length - 1) {
                otpFields[index + 1].focus(); // Focus next field
            }
        });

        field.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !field.value && index > 0) {
                otpFields[index - 1].focus(); // Focus previous field on backspace
            }
        });
    });

    // Verify OTP
    verifyBtn.addEventListener('click', () => {
        const otp = Array.from(otpFields).map(field => field.value).join('');

        // Check if OTP is 6 digits
        if (otp.length === 6) {
            axios.post('http://127.0.0.1:8000/verify-otp', { otp: otp })
                .then(response => {
                    if (response.data.success) {
                        Swal.fire('Success!', 'OTP verified successfully.', 'success');
                        // Optionally, redirect or show the next steps here
                    } else {
                        message.textContent = 'Invalid OTP, please try again.';
                    }
                })
                .catch(error => {
                    console.error('Error verifying OTP:', error);
                    message.textContent = 'Something went wrong, please try again.';
                });
        } else {
            message.textContent = 'Please enter a valid 6-digit OTP.';
        }
    });

    // Resend OTP
    resendLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior

        // Assume you have a way to send the email if needed
        const email = document.getElementById('email').value; // Retrieve the email if necessary

        axios.post('http://127.0.0.1:8000/resend-otp', { email: email })
            .then(response => {
                Swal.fire('Sent!', 'A new OTP has been sent to your email.', 'success');
            })
            .catch(error => {
                console.error('Error resending OTP:', error);
                message.textContent = 'Failed to resend OTP, please try again later.';
            });
    });
});
