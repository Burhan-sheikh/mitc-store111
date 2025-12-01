import { useState, useEffect } from 'react';
import { getProducts, searchProducts } from '../services/api/products';

export const useProducts = (filters = {}, searchTerm = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (searchTerm) {
          data = await searchProducts(searchTerm, filters);
        } else {
          data = await getProducts(filters);
        }
        
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters), searchTerm]);

  return { products, loading, error };
};

export default useProducts;