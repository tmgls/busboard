import axios from 'axios';
// import * as fs from 'fs';

const key = import.meta.env.VITE_API_KEY;

export default async function getArrivals(id: string){
    let url = `https://api.tfl.gov.uk/StopPoint/${id}/Arrivals`;
   
    if (key !== ""){
        url = url + `?=${key}`;
        console.log(key);
    }

    try{
        const response = await axios.get(url);
        console.log(response);
        return JSON.stringify(response.data);
    } catch (error){
        console.error(error);
    }
}