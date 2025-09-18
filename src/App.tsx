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
  const [errorMessage, setErrorMessage] = useState<string>();
  
  async function handleGetArrivals(id: string){
    let data = await getArrivals(id);
    if( data.success){
      setArrivalsData(data.array);
    }
    else{
      setErrorMessage("No data found for stop code")
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
        <>
          <p>{errorMessage}</p>
        <StopCodeForm onSubmit={handleGetArrivals}/>
        </>
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
      <input type="submit" value="Arrivals" className="bg-blue-300 hover:bg-green-300 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"/>
    </form>
  )
}

function BusCard({busData} : {busData : Bus}){
  if (busData !== null && busData.lineName !== ""){
    let timeInMinues = Math.round(busData.timeToStation / 60);
    return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-row pt-1 pb-1 mt-3 mb-3">
        {busData.lineName} to {busData.towards} due in {timeInMinues} {timeInMinues === 1 ? "minute" : "minutes"}
      </div>
    </>
  )
  }
}

export default App