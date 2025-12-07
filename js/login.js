document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = "";

  try {
    const response = await fetch(
      "https://taskmanager-backend-7ms1.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      errorMsg.textContent = data.message || "Invalid credentials";
      return;
    }

    // Store JWT token
    localStorage.setItem("token", data.token);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    errorMsg.textContent = "Network error. Try again.";
  }
});
