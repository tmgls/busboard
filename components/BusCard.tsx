import {Bus} from '../backend/fetchArrivals';
import {Link} from 'react-router-dom';

export function BusCard({busData} : {busData : Bus}){
  if (busData !== null && busData.lineName !== ""){
    let timeInMinues = Math.round(busData.timeToStation / 60);
    return (
    <>
        <Link to="/History">
          <div className="max-w-sm rounded overflow-hidden shadow-sm mt-3 mb-1 hover:bg-blue-100">
            <p>{busData.lineName} from {busData.destinationName} to {busData.towards} due in {timeInMinues} {timeInMinues === 1 ? "minute" : "minutes"}</p>
          </div>
        </Link>
    </>
  )
  }
}