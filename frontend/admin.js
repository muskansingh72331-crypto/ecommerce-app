const API_URL = "http://localhost:8080/api";

const role = localStorage.getItem("role");

if (role !== "ADMIN") {

    alert("Access denied. Admin only.");

    window.location.href = "index.html";
}


// ADD PRODUCT

document
    .getElementById("productForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const product = {

            name: document.getElementById("name").value,

            description:
                document.getElementById("description").value,

            price:
                Number(document.getElementById("price").value),

            quantity:
                Number(document.getElementById("quantity").value)
        };


        try {

            const response =
                await fetch(`${API_URL}/products`, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(product)
                });


            if (!response.ok) {

                throw new Error("Product could not be added");
            }


            alert("Product added successfully!");

            document
                .getElementById("productForm")
                .reset();

            loadProducts();

        } catch (error) {

            alert("Unable to add product.");

            console.error(error);
        }

    });


// LOAD PRODUCTS

async function loadProducts() {

    try {

        const response =
            await fetch(`${API_URL}/products`);

        const products =
            await response.json();

        const container =
            document.getElementById("products");

        container.innerHTML = "";


        products.forEach(product => {

            const div =
                document.createElement("div");

            div.className = "product";

            div.innerHTML = `

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <p>Price: ₹${product.price}</p>

                <p>Stock: ${product.quantity}</p>

                <button
                    onclick="deleteProduct(${product.id})">
                    Delete
                </button>
            `;

            container.appendChild(div);

        });

    } catch (error) {

        console.error(error);
    }
}


// DELETE PRODUCT

async function deleteProduct(id) {

    if (!confirm("Delete this product?")) {
        return;
    }


    try {

        await fetch(
            `${API_URL}/products/${id}`,
            {
                method: "DELETE"
            }
        );


        alert("Product deleted!");

        loadProducts();

    } catch (error) {

        console.error(error);

        alert("Unable to delete product.");
    }
}


// LOAD ALL ORDERS

async function loadOrders() {

    try {

        const response =
            await fetch(`${API_URL}/orders`);

        const orders =
            await response.json();

        const container =
            document.getElementById("allOrders");

        container.innerHTML = "";


        orders.forEach(order => {

            const div =
                document.createElement("div");

            div.className = "product";

            div.innerHTML = `

                <h3>
                    Order #${order.id}
                </h3>

                <p>
                    User ID: ${order.userId}
                </p>

                <p>
                    Amount: ₹${order.totalAmount}
                </p>

                <p>
                    Status: ${order.status}
                </p>


                <select
                    onchange="
                    updateOrderStatus(
                        ${order.id},
                        this.value
                    )">

                    <option
                        value="PLACED"
                        ${order.status === "PLACED"
                        ? "selected" : ""}>
                        PLACED
                    </option>

                    <option
                        value="PROCESSING"
                        ${order.status === "PROCESSING"
                        ? "selected" : ""}>
                        PROCESSING
                    </option>

                    <option
                        value="SHIPPED"
                        ${order.status === "SHIPPED"
                        ? "selected" : ""}>
                        SHIPPED
                    </option>

                    <option
                        value="DELIVERED"
                        ${order.status === "DELIVERED"
                        ? "selected" : ""}>
                        DELIVERED
                    </option>

                    <option
                        value="CANCELLED"
                        ${order.status === "CANCELLED"
                        ? "selected" : ""}>
                        CANCELLED
                    </option>

                </select>
            `;

            container.appendChild(div);

        });

    } catch (error) {

        console.error(error);
    }
}


// UPDATE ORDER STATUS

async function updateOrderStatus(id, status) {

    try {

        await fetch(
            `${API_URL}/orders/${id}/status?status=${status}`,
            {
                method: "PUT"
            }
        );


        alert("Order status updated!");

        loadOrders();

    } catch (error) {

        console.error(error);

        alert("Unable to update status.");
    }
}


loadProducts();
loadOrders();
