import React, { useState, useEffect } from "react";
import useFetch from "../Hooks/useFetch";

// https://yahoo-finance97.p.rapidapi.com/stock-info
function StockInfo() {
  const { loading, data ,error} = useFetch("https://yahoo-finance97.p.rapidapi.com/stock-info","AAPL");
  return <>{loading ? "loading..." :(<>
  <h1>{data.longName}</h1>
  <a href={data.website}>

    <img src={data.logo_url} alt={data.longName} />
  </a>
    <p>{data.longBusinessSummary}</p>
  </>)}</>;
}

export default StockInfo;
