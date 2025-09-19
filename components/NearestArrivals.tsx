import {useEffect, useState} from 'react';
import {Bus} from '../backend/fetchArrivals';
import {PostCodeForm } from './PostCodeForm';
import{BusCard} from './BusCard';
import{getArrivalsByPostcode} from '../backend/fetchStopsByPostcode';

export function NearestArrivals() {
  const [arrivalsData, setArrivalsData] = useState<Bus[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  
  async function handleGetArrivals(postcode: string){
    let data = await getArrivalsByPostcode(postcode);
    if( data.success){
      setArrivalsData(data.array);
    }
    else{
      setErrorMessage("No data found for post code")
    }
  }

    return (
      <>
        <PostCodeForm onSubmit={handleGetArrivals}/>
        {!arrivalsData && 
          <>
            <h2>{errorMessage}</h2>
          </>
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
  