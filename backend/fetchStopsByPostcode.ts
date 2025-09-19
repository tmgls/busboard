import axios from 'axios';
import * as dfns from 'date-fns';
import { Bus, type BusArrayDto, getArrivals } from './fetchArrivals';


//take a postcode and return a long lat NaptanBusCoachStation 
async function getLatLongByPostcode (postcode : string){
    let url = "https://api.postcodes.io/postcodes";

    postcode = postcode.replace(' ','');
    let result: [boolean, number, number] = [false, 0, 0];

    if (postcode !== undefined || postcode !== "" ){
        try{
            url += `/${postcode}`;
            const response = await axios.get(url);
            let responseData = JSON.parse(JSON.stringify(response.data));

            if (responseData.result.longitude !== undefined && responseData.result.latitude !== undefined){
                result = [true, responseData.result.longitude, responseData.result.latitude];
                return result;
            }
            else{
                return result
            }
        }
        catch{
            return result;
        }
    }
    return result;
}

export async function getStopsByPostcode(postcode: string){
    const latLongResult = await getLatLongByPostcode(postcode);
    if (latLongResult[0]){
        const long = latLongResult[1];
        const lat = latLongResult[2];
        const stopTypes = "NaptanPublicBusCoachTram";   //NaptanBusCoachStation
        const radius = 600;     //radius in meters
        const mode = "bus";

        const base = "https://api.tfl.gov.uk/StopPoint/";
        const params = `?lat=${lat}&lon=${long}&stopTypes=${stopTypes}&radius=${radius}&modes=${mode}`;
        const response = await axios.get(base + params);

        return response.data;
    }
    else{
        console.log("unable to find bus stops with given postcode")
        return null
    }
}

export async function getArrivalsByPostcode(postcode: string) : Promise<BusArrayDto>{
    const stopsResponse = await getStopsByPostcode(postcode);
    let busArray : Bus[] = [];
    if (stopsResponse === null){
        return {success: false};
    }
    else{
        let responseData;
        const stopPointsArray : stopType[] = stopsResponse.stopPoints;
        let nearestStops = stopPointsArray.sort((a: stopType, b : stopType) => a.distance - b.distance)
            .slice(0, Math.min(stopPointsArray.length, 2));

        const arrivalsPromises = nearestStops.map(async stop => {
            const stopArrivals = await getArrivals(stop.naptanId);
            return stopArrivals.success ? stopArrivals.array ?? [] : [];
        });

        const arrivalsArrays = await Promise.all(arrivalsPromises);
        busArray = arrivalsArrays.flat();

        return {success: true, array: busArray};
    }
}

type stopType = {
    naptanId: string;
    commonName: string;
    distance: number;
}
