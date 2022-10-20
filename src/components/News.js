import React from "react";
import { Helmet } from "react-helmet";
import useFetch from "../Hooks/useFetch";
import Loading from "../assets/loading.gif";

function News({ symbol }) {
  const symbolCheck = symbol === undefined ? "AAPL" : symbol
  const { loading, data, error } = useFetch("https://yahoo-finance97.p.rapidapi.com/news", symbolCheck);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>News</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <img width="150px" height="150px" src={Loading} alt="loading..." />
      ) : (
        <>
          {error && <div>{`Error :: ${error}`}</div>}
          {data &&
            data.map((news, id) => {
              return (
                <a key={id} href={news?.link}>
                  <div className="flex justify-center m-4">
                    <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                      <img className="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={news?.thumbnail?.resolutions[1]?.url} alt={news.title} />
                      <div className="p-6 flex flex-col justify-start">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">{news?.title}</h5>
                        <p className="text-gray-700 text-base mb-4">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="text-gray-600 text-xs">Last updated {Math.floor(Math.random() * 11)} mins ago</p>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
        </>
      )}
    </>
  );
}

export default News;
