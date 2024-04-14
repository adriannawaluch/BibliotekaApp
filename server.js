const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Trasa dla g³ównej œcie¿ki, przekierowuje u¿ytkownika na stronê powitaln¹
app.get('/', (req, res) => {
    res.send('Aplikacja s³u¿¹ca do wypo¿yczania ksi¹¿ek');
});

// Trasa dla ¿¹dania GET /api/books/all
app.get('/all', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/books/all');
        const data = response.data;
        res.json(data); // Wyœlij dane jako odpowiedŸ JSON
    } catch (error) {
        console.error('B³¹d podczas pobierania danych z API:', error);
        res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas pobierania danych z API' });
    }
});

//get by id
app.get('/bookById', async (req, res) => {
    const bookId = req.query.bookId;

    try {
        const response = await axios.get(`http://localhost:8080/api/books/by_id?bookId=${bookId}`);
        const data = response.data;
        res.json(data); // Wyœlij dane jako odpowiedŸ JSON
    } catch (error) {
        console.error('B³¹d podczas pobierania danych z API:', error);
        res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas pobierania danych z API' });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer dzia³a na porcie ${PORT}`);
});
