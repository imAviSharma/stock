import React, { useState } from "react";
import LineGraph from "../components/LineGraph";
function Home() {
  const [data, setData] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center m-2">
        <div className="flex flex-row">
          <div>
            <datalist id="suggestions">
              <option>First option</option>
              <option>Second Option</option>
            </datalist>
            <input placeholder="Search" className="p-2 border-4 border-indigo-500/75 rounded-xl ml-2 focus:outline-none focus:ring focus:border-blue-500" autoComplete="on" list="suggestions" value={data} onChange={e => setData(e.target.value)} />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        {/* <LineGraph /> */}
      </div>
    </>
  );
}

export default Home;
