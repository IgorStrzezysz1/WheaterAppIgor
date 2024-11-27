import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();  // Załaduj zmienne środowiskowe z pliku .env

const app = express();
const apiKey = process.env.API_KEY;  // Pobierz klucz API

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'Brak nazwy miasta w zapytaniu' });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Błąd API:', error);
        res.status(500).json({ error: 'Nie udało się pobrać danych pogodowych' });
    }
});

app.listen(8080, () => {
    console.log('Serwer działa na http://localhost:8080');
});
