import { useState, useEffect } from 'react';
import { getCustomers } from '../services/api/customers';

export const useCustomers = (filters = {}) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCustomers(filters);
        setCustomers(data);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [JSON.stringify(filters)]);

  return { customers, loading, error };
};

export default useCustomers;