import {Bus} from '../backend/fetchArrivals';
import {Link, useNavigate} from 'react-router-dom';

export function BusCard({busData} : {busData : Bus}){
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Routehistory/${busData.lineName}`)
  }
  if (busData !== null && busData.lineName !== ""){
    let timeInMinues = Math.round(busData.timeToStation / 60);
    return (
    <>
        <div onClick={handleClick}>
          <div className="max-w-sm rounded overflow-hidden shadow-sm mt-3 mb-1 hover:bg-blue-100">
            <p className="font-semibold">{busData.lineName} </p>
              <p className="flex justify-between">
                <span className="text-left">Stop: </span><span className='text-right'> {busData.destinationName}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-left">Destination: </span><span className='text-right'> {busData.towards}</span>
              </p>
            <p className='text-right'>{timeInMinues} {timeInMinues === 1 ? "minute" : "minutes"}</p>
          </div>
        </div>
    </>
  )
  }
}