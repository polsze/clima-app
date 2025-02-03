const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Importamos cors
require('dotenv').config();  // Para cargar las variables de entorno desde el archivo .env

const app = express();
const port = 5000; // Puerto donde corre nuestro servidor

// Habilitar CORS para todas las solicitudes
app.use(cors());  // Esto permite que cualquier origen pueda acceder a la API

// Ruta para obtener el clima
app.get('/weather', async (req, res) => {
    const { city } = req.query; // Obtener la ciudad desde los parámetros de la consulta (query string)
    
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;  // Obtener la API key desde las variables de entorno
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await axios.get(url); // Hacer la solicitud a OpenWeather
        const data = response.data;
        res.json(data); // Enviar la respuesta con los datos del clima
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
