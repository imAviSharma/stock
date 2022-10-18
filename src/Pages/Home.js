import React, {useState} from 'react'

function Home() {

  const [data, setData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  }
    return (
    <div className="flex flex-col justify-center items-center m-2">
      <div className="flex flex-row">
      <input className="p-2 border-4 border-indigo-500/75 rounded-xl ml-2 " type="text" value={data} onChange={e=>setData(e.target.value)} /> 
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default Home