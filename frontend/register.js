const API_URL = "http://localhost:8080/api";

document.getElementById("registerForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {

        const response = await fetch(`${API_URL}/auth/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: role
            })

        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        alert("Registration successful!");

        window.location.href = "login.html";

    } catch (error) {

        document.getElementById("registerMessage").innerText =
            "Registration failed. Email may already exist.";

    }

});
