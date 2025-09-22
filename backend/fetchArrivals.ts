import axios from 'axios';
import * as dfns from 'date-fns';

const key = import.meta.env.VITE_API_KEY;

export class Bus {
    lineName: string;
    destinationName : string;
    towards: string;
    expectedArrival: Date;
    timeToStation: number

    constructor(lineName = "Not given", destinationName = "Not given", towards = "Not given", expectedArrival = "2025-01-01T00:00:00Z", timeToStation = 1440) {
        this.lineName = lineName;
        this.destinationName = destinationName;
        this.towards = towards;
        this.expectedArrival = dfns.parseISO(expectedArrival);
        this.timeToStation = timeToStation;
    }
}

export type BusArrayDto = {
    success: boolean;
    array?: Bus[];
}

type BusJsonRaw = {
    lineName: string;
    destinationName : string;
    towards: string;
    expectedArrival: string;
    timeToStation: number
}

export async function getArrivals(id: string) : Promise<BusArrayDto>{
    let url = `https://api.tfl.gov.uk/StopPoint/${id}/Arrivals`;
   
    if (key){
        url += `?app_key=${key}`;
    }

    try{
        const response = await axios.get<BusJsonRaw[]>(url);
        let responseData = response.data;
        
        let busArray :Bus[] = responseData.map((item : BusJsonRaw) =>
             new Bus(item.lineName, item.destinationName, item.towards, item.expectedArrival, item.timeToStation));

        let filteredBusArray = busArray
            .sort((a: Bus, b : Bus) => a.timeToStation - b.timeToStation)
            .slice(0, Math.min(busArray.length, 5));

        return {success: true, array: filteredBusArray};
    } catch (error){
        console.log(error);
        return {success: false};
    }
}