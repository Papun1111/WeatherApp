import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
export default function WeatherApp(){
    let [weatherInfo,setWeatherInfo]=useState({
        city:"Cuttack",
        feelsLike: 305.66,
        humidity: 81,
        temp: 301.25,
        tempMax: 301.25,
        tempMin: 301.25,
        weather: "light rain",
    });
    let updateInfo=(newinfo)=>{
setWeatherInfo(newinfo);
    }
    return (
        <div style={{textAlign:"center"}}><h2>Weather App
            </h2>
        <SearchBox updateInfo={updateInfo }></SearchBox>
        <InfoBox info={weatherInfo}></InfoBox>
        </div>
    );
}