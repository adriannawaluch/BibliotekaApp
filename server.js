const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Trasa dla g��wnej �cie�ki, przekierowuje u�ytkownika na stron� powitaln�
app.get('/', (req, res) => {
    res.send('Aplikacja s�u��ca do wypo�yczania ksi��ek');
});

// Trasa dla ��dania GET /api/books/all
app.get('/all', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/books/all');
        const data = response.data;
        res.json(data); // Wy�lij dane jako odpowied� JSON
    } catch (error) {
        console.error('B��d podczas pobierania danych z API:', error);
        res.status(500).json({ error: 'Wyst�pi� b��d podczas pobierania danych z API' });
    }
});

//get by id
app.get('/bookById', async (req, res) => {
    const bookId = req.query.bookId;

    try {
        const response = await axios.get(`http://localhost:8080/api/books/by_id?bookId=${bookId}`);
        const data = response.data;
        res.json(data); // Wy�lij dane jako odpowied� JSON
    } catch (error) {
        console.error('B��d podczas pobierania danych z API:', error);
        res.status(500).json({ error: 'Wyst�pi� b��d podczas pobierania danych z API' });
    }
});

app.listen(PORT, () => {
    console.log(`Serwer dzia�a na porcie ${PORT}`);
});
