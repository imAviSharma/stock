import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

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
              <div key={id} className="flex justify-center m-4">
                <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                  <img
                    className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src={news.thumbnail.resolutions[1].url}
                    alt={news.title}
                  />
                  <div className="p-6 flex flex-col justify-start">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">
                      {news.title}
                    </h5>
                    <p className="text-gray-700 text-base mb-4">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p className="text-gray-600 text-xs">
                      Last updated 3 mins ago
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default News;
