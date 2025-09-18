import {Bus} from '../backend/fetchArrivals';

export function BusCard({busData} : {busData : Bus}){
  if (busData !== null && busData.lineName !== ""){
    let timeInMinues = Math.round(busData.timeToStation / 60);
    return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <p>{busData.lineName} to {busData.towards} due in {timeInMinues} {timeInMinues === 1 ? "minute" : "minutes"}</p>
      </div>
    </>
  )
  }
}