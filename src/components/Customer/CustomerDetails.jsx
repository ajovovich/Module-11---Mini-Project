import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CustomerDetails = () => {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!customerId) {
                setError("Customer ID is not available");
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:5000/customers/${customerId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCustomer(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCustomer();
    }, [customerId]);

    console.log('Customer ID:', customerId);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Customer Details</h2>
            <p>ID: {customer.id}</p>
            <p>Name: {customer.name}</p>
            <p>Email: {customer.email}</p>
        </div>
    );
};

export default CustomerDetails;