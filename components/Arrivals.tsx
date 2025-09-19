import {useState} from 'react';
import {getArrivals, Bus} from '../backend/fetchArrivals';
import { StopCodeForm } from './StopCodeForm';
import{BusCard} from './BusCard';

export function Arrivals() {
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

<<<<<<< HEAD
  return (
    <>
    <StopCodeForm onSubmit={handleGetArrivals}/>
    {!arrivalsData && 
      <div>
        <h2>{errorMessage}</h2>
      </div>
=======
  if (arrivalsData !== undefined){
    return (
      <>
       <StopCodeForm onSubmit={handleGetArrivals}/>
        <div>
          {arrivalsData!.map((bus, index) => (
          <BusCard busData={bus} key={String(bus.destinationName) + String(bus.expectedArrival)} />
          ))}
        </div>
      </>
    )}
    else{
      return (
        <>
          <StopCodeForm onSubmit={handleGetArrivals}/>
          <h2>{errorMessage}</h2>
        </>
      );
>>>>>>> 1496275 (Change order of error message)
    }
    {arrivalsData && 
      <div>
        {arrivalsData!.map((bus) => (
        <BusCard busData={bus} key={String(bus.destinationName) + String(bus.expectedArrival)} />
        ))}
      </div>
    }
    </>
  );
}
