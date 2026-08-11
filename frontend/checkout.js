const API_URL = "http://localhost:8080/api";

const userId = localStorage.getItem("userId");

let totalAmount = 0;


async function loadCheckout() {

    if (!userId) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }

    try {

        const response =
            await fetch(`${API_URL}/cart/${userId}`);

        const cartItems =
            await response.json();

        const container =
            document.getElementById("checkoutItems");

        container.innerHTML = "";

        totalAmount = 0;

        if (cartItems.length === 0) {

            container.innerHTML =
                "<p>Your cart is empty.</p>";

            return;
        }

        for (const item of cartItems) {

            const productResponse =
                await fetch(
                    `${API_URL}/products/${item.productId}`
                );

            const product =
                await productResponse.json();

            const subtotal =
                product.price * item.quantity;

            totalAmount += subtotal;

            const div =
                document.createElement("div");

            div.className = "product";

            div.innerHTML = `
                <h3>${product.name}</h3>

                <p>
                    ₹${product.price} ×
                    ${item.quantity}
                </p>

                <p>
                    Subtotal: ₹${subtotal}
                </p>
            `;

            container.appendChild(div);
        }

        document.getElementById("checkoutTotal").innerText =
            `Total: ₹${totalAmount}`;

    } catch (error) {

        console.error(error);

        document.getElementById("checkoutItems").innerText =
            "Unable to load checkout.";
    }
}


async function placeOrder() {

    if (totalAmount <= 0) {

        alert("Your cart is empty.");

        return;
    }

    try {

        const response =
            await fetch(`${API_URL}/orders`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    userId: Number(userId),

                    totalAmount: totalAmount,

                    status: "PLACED"

                })
            });

        if (!response.ok) {

            throw new Error("Order failed");
        }

        alert("🎉 Order placed successfully!");

        window.location.href = "orders.html";

    } catch (error) {

        console.error(error);

        alert("Unable to place order.");
    }
}


loadCheckout();
