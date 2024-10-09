// Access the login form and input elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Event listener for form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the default form submission

    // Get the values entered by the user
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Simple validation
    if (username === "" || password === "") {
        alert("Please fill in both fields.");
        return;
    }

    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem(username);

    // Debugging: Log stored user to console
    console.log('Stored User:', storedUser);

    // If the user exists and the password matches
    if (storedUser) {
        const userData = JSON.parse(storedUser);  // Parse the stored user data
        console.log('User Data:', userData);  // Debugging
        if (userData.password === password) {
            alert("Login successful!");
            localStorage.setItem('currentUser', username);  // Store the current user
            window.location.href = 'chatroom.html';  // Redirect to chatroom
        } else {
            alert("Incorrect password.");
        }
    } else {
        alert("No account found with that username.");
    }
});
