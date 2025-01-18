// Function to toggle password visibility
function togglePasswordVisibility(inputId, buttonId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.getElementById(buttonId);

    toggleButton.addEventListener('click', function() {
        // Toggle between "password" and "text" type
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleButton.classList.add('visible');
        } else {
            passwordInput.type = 'password';
            toggleButton.classList.remove('visible');
        }
    });
}

// Call the function for login form password toggle
togglePasswordVisibility('loginPassword', 'toggleLoginPassword');
togglePasswordVisibility('registerPassword', 'toggleRegisterPassword');
togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');

// Show error message
function showError(inputId, errorMessageId, message) {
    const errorMessage = document.getElementById(errorMessageId);
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    document.getElementById(inputId).style.borderColor = 'red';
}

// Clear error message
function clearError(inputId, errorMessageId) {
    const errorMessage = document.getElementById(errorMessageId);
    errorMessage.textContent = '';
    document.getElementById(inputId).style.borderColor = '#ddd';
}

// Validate email format on blur
function validateEmail(inputId, errorMessageId) {
    const email = document.getElementById(inputId).value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        showError(inputId, errorMessageId, 'Invalid email format');
        return false;
    }
    clearError(inputId, errorMessageId);
    return true;
}

// Validate password length on blur
function validatePassword(inputId, errorMessageId) {
    const password = document.getElementById(inputId).value;
    if (password.length < 6) {
        showError(inputId, errorMessageId, 'Password should be at least 6 characters');
        return false;
    }
    clearError(inputId, errorMessageId);
    return true;
}

// Validate passwords match for registration
function validatePasswordMatch() {
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        showError('confirmPassword', 'registerPasswordError', 'Passwords do not match');
        return false;
    }
    clearError('confirmPassword', 'registerPasswordError');
    return true;
}

// Submit form and show loading spinner if no errors
function handleFormSubmission(formId, emailId, passwordId, confirmPasswordId, submitButtonId) {
    document.getElementById(submitButtonId).disabled = true; // Disable the button to prevent multiple submissions

    // Validate all fields
    const emailValid = validateEmail(emailId, `${formId}EmailError`);
    const passwordValid = validatePassword(passwordId, `${formId}PasswordError`);
    const passwordsMatch = formId === 'registerForm' ? validatePasswordMatch() : true;

    if (emailValid && passwordValid && passwordsMatch) {
        // Simulate form submission with a loading spinner
        document.getElementById('loadingSpinner').style.display = 'block';

        setTimeout(function() {
            document.getElementById('loadingSpinner').style.display = 'none'; // Hide spinner
            alert('Form submitted successfully!');
            document.getElementById(submitButtonId).disabled = false; // Enable submit button again
        }, 2000); // Simulate a 2-second delay for the loading
    } else {
        document.getElementById(submitButtonId).disabled = false; // Enable button if validation fails
    }
}

// Handle login form submission
document.getElementById('loginFormID').addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmission('login', 'loginEmail', 'loginPassword');
});

// Handle registration form submission
document.getElementById('registerFormID').addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmission('register', 'registerEmail', 'registerPassword', 'confirmPassword', 'registerSubmitBtn');
});


// Function to show the login form and hide the register form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

// Function to show the register form and hide the login form
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Event listeners for the links to toggle between forms
document.getElementById('goToRegister').addEventListener('click', showRegisterForm);
document.getElementById('goToLogin').addEventListener('click', showLoginForm);

// Initially show the login form
showLoginForm();
