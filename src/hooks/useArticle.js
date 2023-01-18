import { useState, useEffect } from 'react';
import axios from 'axios';

function useArticle(id)
{
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  const baseUrl = "https://raw.githubusercontent.com/anthonymittz/web-refresher/articles/articles/";

  useEffect(() => {
    axios.get(baseUrl + id)
      .then(res => setResponse(res.data))
      .catch(err => setError(err))
      .finally(() => setReady(true));
  }, []);

  return { response, error, ready };
}

export default useArticle;