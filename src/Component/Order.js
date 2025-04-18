import React, { useState, useEffect } from "react";

function Orders() {
    const [orders, setOrders] = useState([]);

    // Fetch all orders
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        fetch("http://localhost:8084/food-ordering/orders")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Orders:", data); // Debugging
                setOrders(data);
            })
            .catch((error) => console.error("Error fetching orders:", error));
    };

    // Update order status
    const updateOrderStatus = (id, newStatus) => {
        fetch(`http://localhost:8084/food-ordering/orders/${id}/status?status=${newStatus}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        })
        .then(() => fetchOrders()) // Refresh order list after update
        .catch(error => console.error("Error updating order status:", error));
    };

    // Delete an order
    const deleteOrder = (id) => {
        fetch(`http://localhost:8084/food-ordering/${id}`, { method: "DELETE" })
        .then(() => fetchOrders()) // Refresh order list after delete
        .catch(error => console.error("Error deleting order:", error));
    };

    return (
        <div className="container mt-4">
            <h2>Orders</h2>
            {orders.length === 0 ? (
                <p>No orders available.</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Ordered Items</th> {/* ✅ Added column for items */}
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.customer ? order.customer.name : "N/A"}</td>
                                <td>
                                    <ul>
                                        {order.items && order.items.map((item) => (
                                            <li key={item.itemId}>
                                                {item.name} (x{item.quantity}) - ₹{item.total}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>₹{order.totalAmount}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteOrder(order.orderId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Orders;
