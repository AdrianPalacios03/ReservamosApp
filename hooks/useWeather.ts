import { City } from "@/interfaces/City";

export const useWeather = () => {

    const API_KEY = "a5a47c18197737e8eeca634cd6acb581"
    const getCity = async (query: string) => {
        const response = await fetch(`https://search.reservamos.mx/api/v2/places?q=${query}`);

        const data = await response.json();

        const citiesWithWeather = await fetchWeatherForCities(data);
        return citiesWithWeather;
    }

    const fetchWeatherForCities = async (cities: City[]) => {
      const promises = cities.map(async (city: City) => {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.long}&units=metric&appid=${API_KEY}`);
        const weatherData = await weatherResponse.json();
          return { ...city, weather: weatherData };
        });
        return Promise.all(promises);
      };

    return {
        getCity
    }
}