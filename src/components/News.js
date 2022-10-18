import React, { useState, useEffect } from "react";
import axios from "axios";
import {Helmet} from "react-helmet";

const encodedParams = new URLSearchParams();
encodedParams.append("symbol", "AAPL");

const options = {
  method: "POST",
  url: "https://yahoo-finance97.p.rapidapi.com/news",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "93b1ea500emsh115852ee72fa0acp1ffbc7jsnd9edb5fdaee2",
    "X-RapidAPI-Host": "yahoo-finance97.p.rapidapi.com",
  },
  data: encodedParams,
};

function News() {
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
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>News</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        "loading..."
      ) : (
        <>
          {error && <div>{`Error :: ${error}`}</div>}
          {data.map((news, id) => {
            return (
              <div key={id} className="flex">
                <img className="rounded-lg" src={news.thumbnail.resolutions[1].url} alt={news.title} />
                <a href={news.link}>{news.title}</a>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default News;
