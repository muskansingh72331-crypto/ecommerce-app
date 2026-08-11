const API_URL = "http://localhost:8080/api";

const userId = localStorage.getItem("userId");

async function loadCart() {

    if (!userId) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/cart/${userId}`
        );

        const cartItems = await response.json();

        const container =
            document.getElementById("cartItems");

        container.innerHTML = "";

        let total = 0;

        if (cartItems.length === 0) {

            container.innerHTML =
                "<p>Your cart is empty.</p>";

            document.getElementById("total").innerText =
                "Total: ₹0";

            return;
        }

        for (const item of cartItems) {

            const productResponse =
                await fetch(
                    `${API_URL}/products/${item.productId}`
                );

            const product =
                await productResponse.json();

            const itemTotal =
                product.price * item.quantity;

            total += itemTotal;

            const div =
                document.createElement("div");

            div.className = "product";

            div.innerHTML = `

                <h3>${product.name}</h3>

                <p>
                    Price: ₹${product.price}
                </p>

                <p>
                    Quantity:
                    <input
                        type="number"
                        min="1"
                        value="${item.quantity}"
                        onchange="updateQuantity(
                            ${item.id},
                            this.value
                        )"
                    >
                </p>

                <p>
                    Subtotal: ₹${itemTotal}
                </p>

                <button
                    onclick="removeItem(${item.id})">
                    Remove
                </button>

            `;

            container.appendChild(div);
        }

        document.getElementById("total").innerText =
            `Total: ₹${total}`;

    } catch (error) {

        console.error(error);

        document.getElementById("cartItems").innerText =
            "Unable to load cart.";
    }
}


async function updateQuantity(id, quantity) {

    await fetch(`${API_URL}/cart/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            quantity: Number(quantity)
        })
    });

    loadCart();
}


async function removeItem(id) {

    await fetch(`${API_URL}/cart/${id}`, {

        method: "DELETE"

    });

    loadCart();
}


function checkout() {

    window.location.href = "checkout.html";
}


loadCart();
