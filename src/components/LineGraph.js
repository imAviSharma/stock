import { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";

const directionEmojis = {
  up: '🚀',
  down: '💩',
  '': '',
};

const chart = {
  options: {
    chart: {
      type: "candlestick",
      height: 450,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  },
};

const round = (number) => {
  return number ? +number.toFixed(2) : null;
};

async function getStonks(stonksUrl) {
  const response = await fetch(stonksUrl);
  return response.json();
}

function LineGraph({ symbol }) {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);
  const [price, setPrice] = useState(-1);

  useEffect(() => {
    let timeoutId;
    async function getLatestPrice() {
      try {
        const stonksUrl = `https://yahoo-finance-api.vercel.app/${symbol}`;
        const data = await getStonks(stonksUrl);
        console.log(data);
        const gme = data.chart.result[0];
        setPrice(gme.meta.regularMarketPrice.toFixed(2));
        const quote = gme.indicators.quote[0];
        const prices = gme.timestamp.map((timestamp, index) => ({
          x: new Date(timestamp * 1000),
          y: [
            quote.open[index],
            quote.high[index],
            quote.low[index],
            quote.close[index],
          ].map(round),
        }));
        setSeries([
          {
            data: prices,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
      timeoutId = setTimeout(getLatestPrice, 5000 * 2);
    }

    getLatestPrice();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const direction = useMemo(() => prevPrice < price ? 'up' : prevPrice > price ? 'down' : '', [prevPrice, price]);

  return (
    <Chart
      options={chart.options}
      series={series}
      type="candlestick"
      width="100%"
      height={450}
    />
  );
}

export default LineGraph;
