import CountryService from "./services/CountryService.ts";
import {useEffect, useState} from "react";

const Weather = (props: any) => {
    const [weatherData, setWeatherData] = useState<any>()
    const [isLoadingWeather, setIsLoadingWeather] = useState(true);

    useEffect(() => {
        CountryService.getWeather(props.country?.latlng[0], props.country?.latlng[1]).then((r: any) => {
            setWeatherData(r.data);
            setIsLoadingWeather(false);
        }).catch((e) => {
            console.log(e);
        });
    }, [props.country]);


    if (weatherData != undefined && !isLoadingWeather) {
        return (
            <div>
                <h2>Weather in {props.country.capital}</h2>
                <div>temperature {weatherData.main.temp} Celsius</div>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
                <div>wind {weatherData.wind.speed} m/s</div>
            </div>
        )
    } else {
        return (
            <div>loading weather</div>
        )
    }
}

export default Weather