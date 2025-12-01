import { useState, useEffect } from 'react';
import { getReviews, getApprovedReviews } from '../services/api/reviews';

export const useReviews = (filters = {}, approvedOnly = false) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = approvedOnly 
          ? await getApprovedReviews()
          : await getReviews(filters);
        
        setReviews(data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [JSON.stringify(filters), approvedOnly]);

  return { reviews, loading, error };
};

export default useReviews;