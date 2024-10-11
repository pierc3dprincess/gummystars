// Getting references to HTML elements
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messagesList = document.getElementById("messages");
const logoutButton = document.getElementById("logoutButton");

// Your JSONsilo configuration (replace with your actual API key and file ID)
const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiJDTVFaOEFiQmRiWDZhakhsbE5CR29Ld3J6SG8yIiwiaXNzIjoiaHR0cHM6Ly9qc29uc2lsby5jb20iLCJleHAiOjE3MzEyNDM0MTR9.oBw42LxjHkCIxjNGlBNRCr4btTBJSvNDxj3WJEd_vCY"; // Private API key from JSONsilo
const jsonSiloUrl =
    "https://api.jsonsilo.com/public/7c9a6adc-ab64-4e47-8acf-7ad6d7600301"; // Your file URL for storing messages
const corsProxy = "https://cors-anywhere.herokuapp.com/";

// Check if the user is logged in
const loggedInUser = localStorage.getItem("currentUser");
if (!loggedInUser) {
    window.location.href = "login.html"; // If no user is logged in, redirect to login page
} else {
    document.title = `Chatroom - ${loggedInUser}`; // Set title to reflect logged-in username
}

// Function to send a new message
sendButton.addEventListener("click", async () => {
    const message = messageInput.value.trim();
    if (message === "") {
        return; // Don't send empty messages
    }

    // Fetch existing messages, add new one
    const storedMessages = await fetchMessagesFromSilo();

    // Add the new message to the messages array
    storedMessages.push({ username: loggedInUser, message });

    // Append the message to the list in UI
    appendMessageToUI(`${loggedInUser}: ${message}`);

    // Save the updated messages back to JSONsilo
    await saveMessagesToSilo(storedMessages);

    // Clear the input field
    messageInput.value = "";

    // Scroll to the bottom of the chat window
    messagesList.scrollTop = messagesList.scrollHeight;
});

// Function to append a message to the UI
function appendMessageToUI(message) {
    const messageElement = document.createElement("li");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    messagesList.appendChild(messageElement);
}

// Function to fetch messages from JSONsilo
async function fetchMessagesFromSilo() {
    try {
        const response = await fetch(jsonSiloUrl, {
            method: "GET",
        });
        if (response.ok) {
            const messages = await response.json();
            return messages || []; // Return an empty array if no messages
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return [];
    }
}

// Function to save messages to JSONsilo
async function saveMessagesToSilo(messages) {
    try {
        await fetch(
            corsProxy +
                "https://api.jsonsilo.com/api/v1/manage/7c9a6adc-ab64-4e47-8acf-7ad6d7600301",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-MAN-API": apiKey,
                },
                body: JSON.stringify({
                    file_name: "string",
                    file_data: messages, // Saving the updated messages array
                }),
            }
        );
    } catch (error) {
        console.error("Failed to save messages:", error);
    }
}

// Function to handle logout
logoutButton.addEventListener("click", () => {
    localStorage.removeItem("currentUser"); // Remove the logged-in user from localStorage
    window.location.href = "login.html"; // Redirect to login page
});

// Load stored messages when the page loads
document.addEventListener("DOMContentLoaded", async () => {
    const storedMessages = await fetchMessagesFromSilo();
    storedMessages.forEach(({ username, message }) => {
        appendMessageToUI(`${username}: ${message}`);
    });
});
