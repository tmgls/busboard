import axios from 'axios';
import * as dfns from 'date-fns';

const key = import.meta.env.VITE_API_KEY;


//take a postcode and return a long lat

export async function getLatLongByPostcode (postcode : string){
    let url = "https://api.postcodes.io/postcodes";

    let result: [boolean, number, number] = [false, 0, 0];
    if (postcode !== undefined || postcode !== "" ){
        try{
            url += `/${postcode}`;
            const response = await axios.get(url);
            let responseData = JSON.parse(JSON.stringify(response.data));
            console.log(responseData);

            if (responseData.result.longitude !== undefined && responseData.result.latitude !== undefined){
                result = [true, responseData.result.longitude, responseData.result.latitude];
                console.log(result);
                return result;
            }
            else{
                console.log("failed if");
                return result
            }
        }
        catch{
            return result;
        }
    }
    return result;
}