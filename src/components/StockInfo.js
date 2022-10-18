import React, { useState, useEffect } from "react";
import axios from "axios";

const encodedParams = new URLSearchParams();
encodedParams.append("symbol", "AAPL");

const options = {
  method: "POST", 
  url: "https://yahoo-finance97.p.rapidapi.com/stock-info",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "93b1ea500emsh115852ee72fa0acp1ffbc7jsnd9edb5fdaee2",
    "X-RapidAPI-Host": "yahoo-finance97.p.rapidapi.com",
  },
  data: encodedParams,
};

function StockInfo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        setError(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);
  return <>{loading ? "loading..." :(<>
  <h1>{data.longName}</h1>
  <a href={data.website}>

    <img src={data.logo_url} alt={data.longName} />
  </a>
    <p>{data.longBusinessSummary}</p>
  </>)}</>;
}

export default StockInfo;
