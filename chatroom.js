// Getting references to HTML elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesList = document.getElementById('messages');
const logoutButton = document.getElementById('logoutButton');

// Check if the user is logged in
const loggedInUser = localStorage.getItem('currentUser');
if (!loggedInUser) {
    window.location.href = 'login.html'; // If no user is logged in, redirect to login page
} else {
    document.title = `Chatroom - ${loggedInUser}`;  // Set title to reflect logged-in username
}

// Function to send a new message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message === "") {
        return;  // Don't send empty messages
    }

    // Create a new message element
    const newMessage = document.createElement('li');
    newMessage.classList.add('message');
    newMessage.textContent = `${loggedInUser}: ${message}`;

    // Append the message to the list
    messagesList.appendChild(newMessage);

    // Clear the input field
    messageInput.value = '';

    // Scroll to the bottom of the chat window
    messagesList.scrollTop = messagesList.scrollHeight;
});

// Function to handle logout
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('currentUser');  // Remove the logged-in user from localStorage
    window.location.href = 'login.html';      // Redirect to login page
});

// Load stored messages (if any) when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];

    storedMessages.forEach((msg) => {
        const messageElement = document.createElement('li');
        messageElement.classList.add('message');
        messageElement.textContent = msg;
        messagesList.appendChild(messageElement);
    });
});

// Save messages to localStorage when new ones are added
const saveMessages = () => {
    const allMessages = [];
    const messageElements = messagesList.querySelectorAll('.message');
    messageElements.forEach((msg) => {
        allMessages.push(msg.textContent);
    });
    localStorage.setItem('messages', JSON.stringify(allMessages));
};

// Periodically save messages to localStorage
setInterval(saveMessages, 5000);  // Save every 5 seconds
