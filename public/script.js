// Access the signup form and input elements
const signupForm = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

// Event listener for form submission
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the default form submission

    // Clear previous error messages
    usernameError.textContent = '';
    passwordError.textContent = '';

    // Get the values entered by the user
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Simple validation
    if (username === "" || password === "") {
        if (username === "") usernameError.textContent = "Username is required.";
        if (password === "") passwordError.textContent = "Password is required.";
        return;
    }

    // Check if username already exists
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
        usernameError.textContent = "Username already taken. Please choose a different one.";
        return;
    }

    // Store user data in localStorage
    const userData = {
        username: username,
        password: password
    };

    // Save the user data to localStorage
    localStorage.setItem(username, JSON.stringify(userData));

    // Alert the user and redirect to the login page
    alert("Account created successfully!");
    window.location.href = 'login.html';
});
