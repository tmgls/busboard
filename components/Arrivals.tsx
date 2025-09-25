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
  
  return (
    <>
    <StopCodeForm onSubmit={handleGetArrivals}/>
    {!arrivalsData && 
      <div>
        <h2>{errorMessage}</h2>
      </div>
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
