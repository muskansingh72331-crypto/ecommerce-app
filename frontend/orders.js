const API_URL = "http://localhost:8080/api";

const userId = localStorage.getItem("userId");


async function loadOrders() {

    if (!userId) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }

    try {

        const response =
            await fetch(`${API_URL}/orders/user/${userId}`);

        const orders =
            await response.json();

        const container =
            document.getElementById("orders");

        container.innerHTML = "";

        if (orders.length === 0) {

            container.innerHTML =
                "<p>You have no orders yet.</p>";

            return;
        }

        orders.forEach(order => {

            const div =
                document.createElement("div");

            div.className = "product";

            div.innerHTML = `
                <h3>Order #${order.id}</h3>

                <p>
                    Amount: ₹${order.totalAmount}
                </p>

                <p>
                    Status:
                    <strong>${order.status}</strong>
                </p>

                <p>
                    📦 Order Tracking:
                    ${getTrackingMessage(order.status)}
                </p>
            `;

            container.appendChild(div);

        });

    } catch (error) {

        console.error(error);

        document.getElementById("orders").innerHTML =
            "<p>Unable to load orders.</p>";
    }
}


function getTrackingMessage(status) {

    switch (status) {

        case "PLACED":
            return "Order placed successfully.";

        case "PROCESSING":
            return "Your order is being prepared.";

        case "SHIPPED":
            return "Your order has been shipped.";

        case "DELIVERED":
            return "Your order has been delivered.";

        case "CANCELLED":
            return "Your order was cancelled.";

        default:
            return "Status unavailable.";
    }
}


loadOrders();
