document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('show-signup').addEventListener('click', () => {
        document.getElementById('login-container').classList.add('d-none');
        document.getElementById('signup-container-step1').classList.remove('d-none');
    });

    document.getElementById('go-back-login').addEventListener('click', () => {
        document.getElementById('signup-container-step1').classList.add('d-none');
        document.getElementById('login-container').classList.remove('d-none');
    });

    const districtCodeInput = document.getElementById('district-code');
    const nextStepButton = document.getElementById('next-step');

    districtCodeInput.addEventListener('input', () => {
        nextStepButton.disabled = districtCodeInput.value.length !== 4;
    });

    nextStepButton.addEventListener('click', () => {
        if (districtCodeInput.value.length === 4) {
            document.getElementById('signup-container-step1').classList.add('d-none');
            document.getElementById('signup-container-step2').classList.remove('d-none');
        } else {
            console.log('District code must be exactly 4 characters.');
        }
    });

    document.getElementById('parent-button').addEventListener('click', () => {
        document.getElementById('signup-container-step2').classList.add('d-none');
        document.getElementById('signup-container-parent').classList.remove('d-none');
    });

    document.getElementById('student-button').addEventListener('click', () => {
        document.getElementById('signup-container-step2').classList.add('d-none');
        document.getElementById('signup-container-student').classList.remove('d-none');
    });

    const parentForm = document.getElementById('parent-form');

    parentForm.addEventListener('input', (event) => {
        const target = event.target;
        validateParentFormInput(target);
    });

    document.getElementById('complete-registration').addEventListener('click', () => {
        if (validateParentForm()) {
            document.getElementById('signup-container-parent').classList.add('d-none');
            document.getElementById('success-popup').classList.remove('d-none');

            setTimeout(() => {
                document.getElementById('success-popup').classList.add('d-none');
                document.getElementById('login-container').classList.remove('d-none');
            }, 3000);
        }
    });

    function validateParentFormInput(input) {
        const errorMessage = input.nextElementSibling;
        let isValid = true;

        if (input.id === 'confirm-password') {
            const password = document.getElementById('password').value;
            if (input.value !== password) {
                isValid = false;
                errorMessage.textContent = 'Passwords do not match.';
            } else {
                errorMessage.textContent = '';
            }
        } else if (input.id === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                errorMessage.textContent = 'Invalid email format.';
            } else {
                errorMessage.textContent = '';
            }
        } else if (input.id === 'phone') {
            const phonePattern = /^\d{10}$/;
            if (!phonePattern.test(input.value)) {
                isValid = false;
                errorMessage.textContent = 'Invalid phone number.';
            } else {
                errorMessage.textContent = '';
            }
        } else {
            if (input.value.trim() === '') {
                isValid = false;
                errorMessage.textContent = 'This field is required.';
            } else {
                errorMessage.textContent = '';
            }
        }

        if (!isValid) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }

    function validateParentForm() {
        const inputs = parentForm.querySelectorAll('input');
        let isValid = true;

        inputs.forEach((input) => {
            validateParentFormInput(input);
            if (input.classList.contains('error')) {
                isValid = false;
            }
        });

        return isValid;
    }

    const parentCodeInput = document.getElementById('parent-code');
    const nextStepStudentButton = document.getElementById('next-step-student');

    parentCodeInput.addEventListener('input', () => {
        nextStepStudentButton.disabled = parentCodeInput.value.length !== 8;
    });

    nextStepStudentButton.addEventListener('click', () => {
        if (parentCodeInput.value.length === 8) {
            document.getElementById('signup-container-student').classList.add('d-none');
            document.getElementById('welcome-screen').classList.remove('d-none');
        } else {
            const error = document.getElementById('parent-code-error');
            error.textContent = 'Invalid code.';
            parentCodeInput.classList.add('error');
        }
    });

    document.getElementById('go-back-step2').addEventListener('click', () => {
        document.getElementById('signup-container-parent').classList.add('d-none');
        document.getElementById('signup-container-step2').classList.remove('d-none');
    });

    document.getElementById('go-back-step2-student').addEventListener('click', () => {
        document.getElementById('signup-container-student').classList.add('d-none');
        document.getElementById('signup-container-step2').classList.remove('d-none');
    });

    document.getElementById('add-child').addEventListener('click', () => {
        document.getElementById('welcome-screen').classList.add('d-none');
        document.getElementById('add-child-screen').classList.remove('d-none');
    });

    const childCodeInput = document.getElementById('child-code');
    const submitChildCodeButton = document.getElementById('submit-child-code');

    childCodeInput.addEventListener('input', () => {
        submitChildCodeButton.disabled = childCodeInput.value.length !== 6;
    });

    submitChildCodeButton.addEventListener('click', () => {
        if (childCodeInput.value.length === 6) {
            document.getElementById('child-profile').classList.remove('d-none');
            document.getElementById('child-name').textContent = 'John Doe';
        } else {
            const error = document.getElementById('child-code-error');
            error.textContent = 'Invalid code.';
            childCodeInput.classList.add('error');
        }
    });

    document.getElementById('continue-button').addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
});
