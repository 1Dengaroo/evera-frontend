// src/pages/Shop.tsx

import React, { useState, useEffect } from 'react';
import { Section } from '../components/Section/Section';
import { getProducts, Product } from '../services/ProductService';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getProducts();
      setProducts(result);
    }
    fetchData();
  }, []);

  return (
    <Section title="Shop Our Products" backgroundColor="bg-white">
      <p>Explore our wide range of products designed to meet your needs.</p>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Shop;
