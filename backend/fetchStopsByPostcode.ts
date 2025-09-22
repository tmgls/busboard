import axios from 'axios';
import * as dfns from 'date-fns';
import { Bus, type BusArrayDto, getArrivals } from './fetchArrivals';

async function getLatLongByPostcode (postcode : string){
    let url = `https://api.postcodes.io/postcodes/${postcode}`;

    postcode = postcode.replace(' ','');
    let result: LatLongResult = {success: false, longitude: 0, latitude: 0};

    if (postcode ){
        try{
            const response = await axios.get(url);
            let responseData = response.data;

            if (responseData.result.longitude !== undefined && responseData.result.latitude !== undefined){
                result = {success: true,  longitude: responseData.result.longitude, latitude: responseData.result.latitude};
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
    if (latLongResult.success){
        const long = latLongResult.longitude;
        const lat = latLongResult.latitude;
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
        const stopPointsArray : StopType[] = stopsResponse.stopPoints;
        let nearestStops = stopPointsArray.sort((a: StopType, b : StopType) => a.distance - b.distance)
            .slice(0, Math.min(stopPointsArray.length, 2));

        const arrivalsPromises = nearestStops.map(async stop => {
            const stopArrivals = await getArrivals(stop.naptanId);
            return stopArrivals.success ? stopArrivals.array ?? [] : [];
        });

        const arrivalsArrays = await Promise.all(arrivalsPromises); //await here is blocking. Promise.all allows parallel awaiting
        busArray = arrivalsArrays.flat();

        return {success: true, array: busArray};
    }
}

type StopType = {
    naptanId: string;
    commonName: string;
    distance: number;
}

type LatLongResult = {
    success: boolean;
    longitude: number;
    latitude: number;
}
