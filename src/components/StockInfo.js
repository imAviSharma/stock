import React from "react";
import useFetch from "../Hooks/useFetch";

function StockInfo({ symbol }) {
  const { loading, data, error } = useFetch(
    "https://yahoo-finance97.p.rapidapi.com/stock-info",
    symbol
  );
  return (
    <>
    {error && <div className="error">{error.message}</div>}
      {loading ? (
        "loading..."
      ) : (
        <>
          <h1>{data.longName}</h1>
          <p>{data.currentPrice} {data.currency}</p>
          <p>{ Math.round(((data.currentPrice-data.open) + Number.EPSILON) * 100) / 100 } {data.currency} Today</p>
          <a href={data.website}>
            <img src={data.logo_url} alt={data.longName} />
          </a>
          <p>{data.longBusinessSummary}</p>
        </>
      )}
    </>
  );
}

export default StockInfo;
