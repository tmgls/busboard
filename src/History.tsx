import {Link, useParams} from 'react-router-dom';

function History(){
    const {lineName} = useParams<{ lineName: string}>();
    return(
    <>
    <section>
        <nav>
            <Link to="/">
                <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
                >BusBoard</h1>
            </Link>
        </nav>
    </section>
        <header className="bg-cyan-600 text-white py-6 text-center mt-3">
            <h2 className="text-3xl font-bold">The History of London Buses</h2>
        </header>

        <section className="max-w-3xl mx-auto px-4 py-10 space-y-6 text-gray-800 leading-relaxed">
            <h3 className="font-bold">History of the {lineName}</h3>
            <p>
                London’s iconic buses have come a long way since the 19th century. The first buses in London were actually horse-drawn and began operating in 1829, running from Paddington to the City of London.
            </p>

            <p>
                By the early 1900s, motorized buses began to replace the horse-drawn versions. In 1909, the London General Omnibus Company (LGOC) introduced the famous B-type bus, which was the first mass-produced bus in the world.
            </p>

            <p>
                Perhaps the most iconic of all is the red Routemaster, introduced in the 1950s. These double-decker buses became a global symbol of London. Although most were retired from regular service in the early 2000s, a few still operate on heritage routes.
            </p>

            <p>
                Today, London buses are fully accessible, modern, and environmentally friendly. The city has been investing in hybrid and electric buses as part of its sustainability goals.
            </p>

            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Arriva_London_buses_VLA157_%28LJ55_BSU%29_%26_RM54_%28LDS_279A%29%2C_Whitehall%2C_route_159%2C_9_December_2005.jpg/1920px-Arriva_London_buses_VLA157_%28LJ55_BSU%29_%26_RM54_%28LDS_279A%29%2C_Whitehall%2C_route_159%2C_9_December_2005.jpg" 
                width="500" 
                height="600" 
                alt="classic London Routemaster buses"
                className="mx-auto rounded shadow-md"
            />
        </section>
    </>
    );
}

export default History