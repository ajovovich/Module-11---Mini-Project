import React, { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {
      const response = await fetch('http://127.0.0.1:5000/Orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
