document.addEventListener('DOMContentLoaded', () => {
    const otpFields = document.querySelectorAll('.otp-field');
    const verifyBtn = document.getElementById('verifyBtn');
    const message = document.getElementById('message');

    otpFields.forEach((field, index) => {
        field.addEventListener('input', () => {
            if (field.value.length === 1 && index < otpFields.length - 1) {
                otpFields[index + 1].focus();
            }
        });

        field.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !field.value && index > 0) {
                otpFields[index - 1].focus();
            }
        });
    });

    verifyBtn.addEventListener('click', () => {
        const otp = Array.from(otpFields).map(field => field.value).join('');
        if (otp.length === 6) {
            axios.post('http://127.0.0.1:8000/verify-otp', { otp: otp })
                .then(response => {
                    if (response.data.success) {
                        Swal.fire('Success!', 'OTP Verified successfully.', 'success');
                    } else {
                        message.textContent = 'Invalid OTP, please try again.';
                    }
                })
                .catch(() => {
                    message.textContent = 'Something went wrong, please try again.';
                });
        } else {
            message.textContent = 'Please enter a valid 6-digit OTP.';
        }
    });

    const resendLink = document.getElementById('resendLink');
    resendLink.addEventListener('click', (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/resend-otp')
            .then(() => {
                Swal.fire('Sent!', 'A new OTP has been sent to your email.', 'success');
            })
            .catch(() => {
                message.textContent = 'Failed to resend OTP, please try again later.';
            });
    });
});
