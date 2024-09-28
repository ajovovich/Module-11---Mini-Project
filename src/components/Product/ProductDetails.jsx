import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/Products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const deleteProduct = async () => {
    try {
      await fetch(`http://127.0.0.1:5000/Products/${productId}`, { method: 'DELETE' });
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  return product ? (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <Button variant="danger" onClick={deleteProduct}>Delete</Button>
      <Button variant="primary" onClick={toggleUpdateForm}>
        {showUpdateForm ? 'Cancel' : 'Update'}
      </Button>

      {showUpdateForm && (
        <UpdateProductForm product={product} setProduct={setProduct} />
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

const UpdateProductForm = ({ product, setProduct }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://127.0.0.1:5000/Products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button type="submit">Update Product</Button>
    </Form>
  );
};

export default ProductDetails;
