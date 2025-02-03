const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; // Usar el puerto dinámico de Render

app.use(cors());

app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);  // Ahora usa el puerto dinámico
});
