import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState('');
    const [error, setError] = useState(false);
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "";// add your own API key

    const getWeatherInfo = async () => {
        try {
            const response = await fetch(`${url}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            console.log(data);
            let result = {
                city: city,
                temp: data.main.temp,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                humidity: data.main.humidity,
                feelsLike: data.main.feels_like,
                weather: data.weather[0].description
            };
            console.log(result);
            return result;
        } catch (err) {
            setError(true);
            throw err; // Optionally rethrow to be handled in the calling function
        }
    };

    const handleChange = (evt) => {
        setCity(evt.target.value);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            setCity('');
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setError(false); // Reset error state on successful fetch
        } catch (err) {
            // Error is handled inside getWeatherInfo, so no need to do anything here
        }
    };

    return (    
        <div className="SearchBox">   
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    value={city}
                    label="City Name"
                    variant="outlined"
                    required={true} // Correct usage of boolean required attribute
                    onChange={handleChange}
                />
                <br /><br />
                <Button type="submit" variant="contained">
                    Search
                </Button>
            </form>
            {error && <p>No such place exists</p>}
        </div>
    );
}
