document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const errorMsg = document.getElementById("errorMsg");
    const successMsg = document.getElementById("successMsg");

    errorMsg.textContent = "";
    successMsg.textContent = "";

    try {
        const response = await fetch("http://taskmanager-backend-i6lw.onrender.com/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMsg.textContent = data.message || "Signup failed";
            return;
        }

        successMsg.textContent = "Signup successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } catch (error) {
        errorMsg.textContent = "Network error. Try again.";
    }
});