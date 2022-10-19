import React from "react";
import useFetch from "../Hooks/useFetch";
import Loading from "../assets/loading.gif";

function StockInfo({ symbol }) {
  const { loading, data, error } = useFetch("https://yahoo-finance97.p.rapidapi.com/stock-info", symbol);
  return (
    <>
      {error && <div className="error">{error.message}</div>}
      {loading ? (
        <img width="150px" height="150px" src={Loading} alt="loading..." />
      ) : (
        <div className="flex flex-col justify-center">
          <a className="flex flex-col justify-center items-center" href={data.website}>
            <img width="150px" height="150px" src={data.logo_url} alt={data.longName} />
            <h1 className="capitalize text-2xl font-bold">{data.longName}</h1>
          </a>
          <p className="text-center">$ {data.currentPrice}</p>
          <p className="text-center">$ {Math.round((data.currentPrice - data.open + Number.EPSILON) * 100) / 100} Today</p>
          <p className="text-justify">{data.longBusinessSummary}</p>
        </div>
      )}
    </>
  );
}

export default StockInfo;
