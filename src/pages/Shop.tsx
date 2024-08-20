import React, { useState, useEffect } from 'react';
import { Section } from '../components/Section/Section';
import { getProducts, Product } from '../services/ProductService';
import ProductCard from '../components/Card/ProductCard';

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
    <Section 
      title="Discover All Products" 
      titleClassName='text-4xl font-serif font-thin mt-8 mb-8'
      backgroundColor="bg-white" 
      shortHeight>
      <p className='font-light mb-8'>SHOP ALL</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
};

export default Shop;
