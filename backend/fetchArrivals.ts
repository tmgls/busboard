import axios from 'axios';
import * as fs from 'fs';


export default async function getArrivals(id: string){
    let key;
    try{
        key = fs.readFileSync("./backend/key.txt");
    } catch{
        key = "";
    }
    let url = `https://api.tfl.gov.uk/StopPoint/${id}/Arrivals`;
    // try{
    //    key = await fs.readFile("./backend/key.txt", 'utf-8', (err, data) => {if(err) throw err; return data;});
    // } catch{
    //     key = "";
    // }
    // if(key){
    //     url = url + `?=${key}`;
    // }

    try{
        const response = await axios.get(url);
        console.log(response);
        return JSON.stringify(response.data);
    } catch (error){
        console.error(error);
    }
}