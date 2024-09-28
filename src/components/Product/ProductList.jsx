import React, { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null); 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/Products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleSelectProduct(product.id)}>View Details</button>
          </li>
        ))}
      </ul>

      {selectedProductId && (
        <ProductDetails productId={selectedProductId} />
      )}
    </div>
  );
};

export default ProductList;