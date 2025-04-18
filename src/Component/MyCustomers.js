import React, { useEffect, useState } from "react";

function MyCustomers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8084/food-ordering/customers")
            .then((response) => response.json())
            .then((data) => setCustomers(data))
            .catch((error) => console.error("Error fetching customers:", error));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center">Registered Customers</h2>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.custId}>
                            <td>{customer.custId}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.mobNo }</td>
                            <td>{customer.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyCustomers;
