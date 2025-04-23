const authForm = document.getElementById('authForm');
const usernameField = document.getElementById('usernameField');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const toggleText = document.getElementById('toggleText');
const toggleLink = document.getElementById('toggleLink');
const errorDiv = document.getElementById('error');

let isSignup = true; // default mode

// Toggle between Signup and Login
toggleLink.addEventListener('click', () => {
  isSignup = !isSignup;

  if (isSignup) {
    formTitle.textContent = "Signup";
    usernameField.style.display = "block";
    submitBtn.textContent = "Sign Up";
    toggleText.innerHTML = 'Already have an account? <span id="toggleLink">Login</span>';
  } else {
    formTitle.textContent = "Login";
    usernameField.style.display = "none";
    submitBtn.textContent = "Log In";
    toggleText.innerHTML = 'Don\'t have an account? <span id="toggleLink">Signup</span>';
  }
  // Rebind the toggle after DOM change
  document.getElementById('toggleLink').addEventListener('click', () => {
    toggleLink.click();
  });
  errorDiv.textContent = "";
});

// Form submit
authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorDiv.textContent = "";

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (isSignup) {
    if (username === '' || email === '' || password === '') {
      showError("Please fill in all fields!");
      return;
    }

    if (!validateEmail(email)) {
      showError("Invalid email address!");
      return;
    }

    if (password.length < 6) {
      showError("Password must be at least 6 characters!");
      return;
    }

    saveUser(email, { username, password });
    alert('Signup Successful! You can now log in.');
    toggleLink.click(); // Switch to login
    authForm.reset();

  } else {
    if (email === '' || password === '') {
      showError("Please fill in all fields!");
      return;
    }

    const user = getUser(email);
    if (!user) {
      showError("No user found with this email!");
      return;
    }

    if (user.password !== password) {
      showError("Incorrect password!");
      return;
    }

    alert(`Welcome back, ${user.username}!`);
    authForm.reset();
  }
});

// Helper functions
function showError(message) {
  errorDiv.textContent = message;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function saveUser(email, data) {
  localStorage.setItem(email, JSON.stringify(data));
}

function getUser(email) {
  const data = localStorage.getItem(email);
  return data ? JSON.parse(data) : null;
}
