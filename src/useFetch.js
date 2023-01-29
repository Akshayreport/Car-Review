import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    //Runs the function after each render e.g change of state
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        //console.log(data);
        setData(data);
        setisPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          //console.log('Fetch aborted');
        } else {
          setisPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

// Use effect dependies (second parameter) means that function will only
// run when that variable has changed (e.g useState)

export default useFetch;
