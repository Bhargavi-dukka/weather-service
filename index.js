const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send('City parameter is required');
    }

    const apiUrl = process.env.WEATHERSTACK_API_URL;
    const apiKey = process.env.WEATHERSTACK_API_KEY;

    try {
        const response = await axios.get(apiUrl, {
            params: {
                access_key: apiKey,
                query: city
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
