const API_URL = "http://localhost:8080/api";

document.getElementById("loginForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {

        const response = await fetch(`${API_URL}/auth/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const user = await response.json();

        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("role", user.role);

        alert("Login successful!");

        window.location.href = "index.html";

    } catch (error) {

        document.getElementById("loginMessage").innerText =
            "Invalid email or password.";

    }

});
