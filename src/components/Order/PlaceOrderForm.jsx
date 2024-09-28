import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const PlaceOrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/customers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/Products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      customer_id: selectedCustomer,
      product_ids: selectedProducts,
      date: orderDate,
    };

    // Debugging log
    console.log('Order Data:', orderData);

    try {
      const response = await axios.post('http://127.0.0.1:5000/Orders', orderData);
      console.log('Order placed:', response.data);
    } catch (error) {
      console.error('Error placing order:', error.response ? error.response.data : error.message);
    }
  };

  const handleProductChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedProducts(selected);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Customer</Form.Label>
        <Form.Control as="select" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} required>
          <option value="">Select a customer</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Product</Form.Label>
        <Form.Control as="select" multiple value={selectedProducts} onChange={handleProductChange} required>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Order Date</Form.Label>
        <Form.Control type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit">Place Order</Button>
    </Form>
  );
};

export default PlaceOrderForm;