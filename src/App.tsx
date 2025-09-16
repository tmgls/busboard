import {useState} from 'react';
import getArrivals from '../backend/fetchArrivals';

function App() {
  return (
    <>
        <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
        >BusBoard</h1>
        <Arrivals id={"490008660N"}/>
    </>
  )
}

function Arrivals({id} : {id: string}) {
  const [arrivalsData, setArrivalsData] = useState<string>();
  
  async function handleClick(){
    let data = await getArrivals(id);
    setArrivalsData(data);
  }
  return (
    <>
      <button
      onClick = {handleClick}
      >
        Arrivals
      </button>
      <div>
        {arrivalsData}
      </div>
    </>
  )
}

export default App
