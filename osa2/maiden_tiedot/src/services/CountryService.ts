import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const search = () => {
    return axios.get(baseUrl)
}

const getWeather = (lat: string, lon: string) => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    return axios.get(url);
}

export default {
    search: search,
    getWeather: getWeather
}