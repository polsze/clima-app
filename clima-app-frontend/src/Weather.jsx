import { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    // Función para obtener el clima
    const getWeather = async () => {
        if (!city) {
            setError('Por favor, ingrese el nombre de una ciudad.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            setWeatherData(null);
            setError('No se pudo obtener el clima. Intente de nuevo.');
        }
    };

    return (
        <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-center mb-4">Clima en la Ciudad</h1>
            <input
                type="text"
                placeholder="Ingresa una ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
                onClick={getWeather}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Obtener Clima
            </button>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {weatherData && (
                <div className="mt-4">
                    <h2 className="text-lg font-bold">{weatherData.name}, {weatherData.sys.country}</h2>
                    <p className="text-sm">{weatherData.weather[0].description}</p>
                    <p className="text-2xl font-bold">{weatherData.main.temp}°C</p>
                    <p>Temp. Real: {weatherData.main.feels_like}°C</p>
                    <p>Humedad: {weatherData.main.humidity}%</p>
                    <p>Viento: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
