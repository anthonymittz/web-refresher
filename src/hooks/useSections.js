import { useState, useEffect } from 'react';
import axios from 'axios';

const mapUrl = "https://raw.githubusercontent.com/anthonymittz/web-refresher/articles/map.json";

function useSections()
{
  const [sections, setSections] = useState(null);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(true);

  const fetchData = () => {
    axios.get(mapUrl)
      .then(result => {
        if (dataIsValid(result.data)) 
          setSections(() => result.data.sections);
      })
      .catch(err => 
        setError(err))
      .finally(() => 
        setReady(false));
  };

  useEffect(() => {
    fetchData();
  }, [])
  return { sections, error, ready };
}

function dataIsValid(data) {
  return Object.keys(data)
    .find(field => field === "sections");
}

export default useSections;