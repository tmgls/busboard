import {Arrivals} from '../components/Arrivals';
import {NearestArrivals} from '../components/NearestArrivals';

function App() {
  return (
    <>
        <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
        >BusBoard</h1>
        <Arrivals/>
        <NearestArrivals/>
    </>
  )
}

export default App