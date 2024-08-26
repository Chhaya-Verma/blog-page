document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('loggedIn')) {
        showLogin();
    } else {
        showLogin(); // Ensure login form is shown initially
    }
});

function showLogin() {
    document.getElementById('signup-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
}

function showSignUp() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('signup-container').classList.remove('hidden');
}

// Function to validate Navgurukul email and 8-character password
function validateForm(email, password) {
    const navgurukulEmailPattern = /^[a-zA-Z0-9._%+-]+@navgurukul\.org$/;
    if (!navgurukulEmailPattern.test(email)) {
        alert('Enter only Navgurukul email ID');
        return false;
    }
    if (password.length !== 8) {
        alert('Enter only an 8-character password');
        return false;
    }
    return true;
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const loginEmail = document.getElementById('login-email').value;
    const password = document.querySelector('#login-form input[type="password"]').value;
    
    if (validateForm(loginEmail, password)) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === loginEmail && user.password === password);

        if (!user) {
            alert("You don't have an account. Please sign up first.");
        } else {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', user.username); // Store the username
            window.location.href = 'welcome.html';
        }
    }
});


document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.querySelector('#signup-form input[type="text"]').value;
    const signupEmail = document.getElementById('signup-email').value;
    const password = document.querySelector('#signup-form input[type="password"]').value;
    
    if (validateForm(signupEmail, password)) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === signupEmail);

        if (existingUser) {
            alert("This email is already registered. Please log in.");
        } else {
            users.push({ username, email: signupEmail, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert("Sign up successful! You can now log in.");
            showLogin();
        }
    }
});

document.getElementById('signup-link').addEventListener('click', function() {
    showSignUp();
});

document.getElementById('login-link').addEventListener('click', function() {
    showLogin();
});
