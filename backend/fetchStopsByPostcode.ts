import axios from 'axios';
import { Bus, type BusArrayDto, getArrivals } from './fetchArrivals';

const DEFAULT_STOP_TYPES = "NaptanPublicBusCoachTram";
const DEFAULT_RADIUS_METRES = 600;
const DEFAULT_MODE = "bus";

async function getLatLongByPostcode (postcode : string){
    let url = `https://api.postcodes.io/postcodes/${postcode}`;

    postcode = postcode.replace(' ','');
    let result: LatLongDto = {success: false, longitude: 0, latitude: 0};

    if (postcode){
        try{
            const response = await axios.get<LatLongResponse>(url);
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
    const latLong : LatLongDto = await getLatLongByPostcode(postcode);
    if (latLong.success){
        const long = latLong.longitude;
        const lat = latLong.latitude;
        const stopTypes = DEFAULT_STOP_TYPES   //NaptanBusCoachStation
        const radius = DEFAULT_RADIUS_METRES;     //radius in meters
        const mode = DEFAULT_MODE;

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
        let nearestStops = stopPointsArray.sort((a, b) => a.distance - b.distance)
            .slice(0, 2);

        const arrivalsArrays = await Promise.all(
            nearestStops.map(async stop => {
                const stopArrivals = await getArrivals(stop.naptanId);
                return stopArrivals.success ? stopArrivals.array ?? [] : [];
            })
        );

        busArray = arrivalsArrays.flat();

        return {success: true, array: busArray};
    }
}

type StopType = {
    naptanId: string;
    commonName: string;
    distance: number;
}

type LatLongDto = {
    success: boolean;
    longitude: number;
    latitude: number;
}

type LatLongResponse = {        //Object returned from postcodes api
    result: {
        longitude: number;
        latitude: number;
    }
}
