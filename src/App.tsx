import {useState} from 'react';
import {getArrivals, Bus} from '../backend/fetchArrivals';

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
  const [arrivalsData, setArrivalsData] = useState<Bus[]>();
  
  async function handleClick(){
    let data = await getArrivals(id);
    if( data.success){
      setArrivalsData(data.array);
    }
  }

  if (arrivalsData !== undefined){
    return (
      <>
        <button
        onClick = {handleClick}
        >
          Arrivals
        </button>
        <div>
          {arrivalsData!.map((bus, index) => (
            <BusCard busData={bus} />
          ))}
        </div>
      </>
    )}
    else{
      return (
        <button
        onClick = {handleClick}
        >
          Arrivals
        </button>
      );
    }
  }

function BusCard({busData} : {busData : Bus}){
  if (busData !== null && busData.lineName !== "")
  return (
  <>
    <div>
      {busData.lineName} to {busData.towards}
    </div>
  </>
 )
}

export default App