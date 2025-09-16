import axios from 'axios';

const key = import.meta.env.VITE_API_KEY;

export default async function getArrivals(id: string){
    let url = `https://api.tfl.gov.uk/StopPoint/${id}/Arrivals`;
   
    if (key){
        url += `?app_key=${key}`, url;
    }

    try{
        const response = await axios.get(url);
        return JSON.stringify(response.data);
    } catch (error){
        return "500: Internal Server Error"
    }
}