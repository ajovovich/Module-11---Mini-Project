import React, { useEffect, useState } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/Orders');
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text(); 
          throw new Error(`The response is not JSON: ${text}`);
        }
        
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Order #{order.id} - {order.productName} for {order.customerName} on {order.orderDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;