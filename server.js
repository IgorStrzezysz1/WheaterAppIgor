import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();//tego nie rozumiem?

const app = express(); //tego nie rozumiem?
const PORT = 3000;//tego nie rozumiem?

app.use(express.static('public')); // Obsługa plików statycznych (np. HTML, CSS)

// Endpoint do pobierania danych pogodowych
app.get('/weather', async (req, res) => {//tego nie rozumiem?
    const city = req.query.city;//tego nie rozumiem?
    const apiKey = process.env.API_KEY;//tego nie rozumiem?

    if (!city) {
        return res.status(400).json({ error: 'Brak nazwy miasta w żądaniu.' });//tego nie rozumiem?
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;//tego nie rozumiem?

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({ error: response.statusText });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.' });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
