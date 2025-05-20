import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useApi = (apiCall, onSuccess, onError) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchData = useCallback(
    async (params) => {
      setLoading(true);
      setError(null);
      try {
        const result = await dispatch(apiCall(params)).unwrap();
        setData(result);
        if (onSuccess) {
          onSuccess(result);
        }
        return result;
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message || 'Something went wrong');
        if (onError) {
          onError(err);
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall, dispatch, onError, onSuccess]
  );

  // Function to manually trigger the API call
  const execute = useCallback(
    (params) => {
      return fetchData(params);
    },
    [fetchData]
  );

  // Option to automatically fetch on mount
  useEffect(() => {
    let mounted = true;
    
    const fetchOnMount = async () => {
      try {
        await fetchData();
      } catch (err) {
        // Error is already handled in fetchData
      }
    };

    if (mounted) {
      fetchOnMount();
    }

    return () => {
      mounted = false;
    };
  }, [fetchData]);

  return { data, loading, error, execute };
};

export default useApi;
