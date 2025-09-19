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
          <h2>{errorMessage}</h2>
          <StopCodeForm onSubmit={handleGetArrivals}/>
        </>
      );
    }
  }