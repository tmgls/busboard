import {Arrivals} from '../components/Arrivals';
import {NearestArrivals} from '../components/NearestArrivals';

function App() {
  return (
    <>
        <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
        >BusBoard</h1>
        <div className='flex flex-row'>
            <div className='flex-grow'/>
            <div className='ml-2 mr-2'>
              <Arrivals/>
            </div>
            <div className='ml-2 mr-2'>
              <NearestArrivals/>
            </div>
          <div className='flex-grow'/>
        </div>
    </>
  )
}

export default App