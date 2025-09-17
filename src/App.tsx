import {useState, type FormEventHandler} from 'react';
import {getArrivals, Bus} from '../backend/fetchArrivals';

function App() {
  return (
    <>
        <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
        >BusBoard</h1>
        <Arrivals/>
    </>
  )
}

function Arrivals() {
  const [arrivalsData, setArrivalsData] = useState<Bus[]>();
  
  async function handleGetArrivals(id: string){
    let data = await getArrivals(id);
    if( data.success){
      setArrivalsData(data.array);
    }
  }

  if (arrivalsData !== undefined){
    return (
      <>
       <StopCodeForm onSubmit={handleGetArrivals}/>
        <div>
          {arrivalsData!.map((bus, index) => (
            <BusCard busData={bus} key={index} />
          ))}
        </div>
      </>
    )}
    else{
      return (
       <StopCodeForm onSubmit={handleGetArrivals}/>
      );
    }
  }

function StopCodeForm({onSubmit} : {onSubmit: Function}) {
  const [stopCode, setStopCode] = useState<string>("");

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setStopCode(event.currentTarget.value);
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //prevent page frefresh
    onSubmit(stopCode);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label> Enter a stop code:
        <input 
          type="text"
          onChange={handleChange}
          value={stopCode}
        />
      </label>
      <input type="submit" value="Arrivals"/>
    </form>
  )
}

function BusCard({busData} : {busData : Bus}){
  if (busData !== null && busData.lineName !== "")
  return (
  <>
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-row pt-1 pb-1 mt-3 mb-3">
      {busData.lineName} to {busData.towards}
    </div>
  </>
 )
}

export default App