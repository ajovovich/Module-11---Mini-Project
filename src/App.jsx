import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import CreateCustomerForm from './components/Customer/CreateCustomerForm';
import CustomerDetails from './components/Customer/CustomerDetails';
import CustomerList from './components/Customer/CustomerList';
import UpdateCustomerForm from './components/Customer/UpdateCustomerForm';
import ProductList from './components/Product/ProductList';
import CreateProductForm from './components/Product/CreateProductForm';
import ProductDetails from './components/Product/ProductDetails';
import PlaceOrderForm from './components/Order/PlaceOrderForm';
import OrderList from './components/Order/OrderList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-link" to="/customers">Customer List</NavLink>
          <NavLink className="nav-link" to="/create-customer">Create Customer</NavLink>
          <NavLink className="nav-link" to="/products">Product List</NavLink>
          <NavLink className="nav-link" to="/create-product">Create Product</NavLink>
          <NavLink className="nav-link" to="/place-order">Place Order</NavLink>
          <NavLink className="nav-link" to="/orders">Order List</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Container>
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/create-customer" element={<CreateCustomerForm />} />
        <Route path="/customers/:customerId" element={<CustomerDetails />} />
        <Route path="/update-customer/:customerId" element={<UpdateCustomerForm />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/create-product" element={<CreateProductForm />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/place-order" element={<PlaceOrderForm />} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </Container>
  </Router>
);


export default App;
