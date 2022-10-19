import { useState, useCallback, useEffect } from "react";
import axios from "axios";

function useFetch(url, symbol) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const encodedParams = new URLSearchParams();
  encodedParams.append("symbol", symbol);

  const options = {
    method: "POST",
    url: url,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "93b1ea500emsh115852ee72fa0acp1ffbc7jsnd9edb5fdaee2",
      "X-RapidAPI-Host": "yahoo-finance97.p.rapidapi.com",
    },
    data: encodedParams,
  };

  const getApiData = useCallback(async () => {
    setLoading(true);
    const response = await axios.request(options).catch((err)=>setError(err));
    setData(response.data.data);
    setLoading(false);
    console.log("Calling API");
  },[url,symbol]);

  useEffect(() => {
    getApiData();
  }, [url, symbol]);

  return { loading, data ,error};
}

export default useFetch;
