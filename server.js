const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


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

app.delete('/deleteBook', async (req, res) => {
    const bookId = req.query.bookId;

    try {
        const response = await axios.delete(`http://localhost:8080/api/books/deleteBook?bookId=${bookId}`);
        res.status(200).json({ message: 'Ksi¹¿ka zosta³a pomyœlnie usuniêta' });
    } catch (error) {
        console.error('B³¹d podczas usuwania ksi¹¿ki:', error);
        res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas usuwania ksi¹¿ki' });
    }
});

// Trasa POST dla newBook
app.post('/newBook', async (req, res) => {
    const { title, language, name, lastname } = req.body;

    console.log("Przes³ane dane:", { title, language, name, lastname }); // Dodaj to

    try {
        const response = await axios.post('http://localhost:8080/api/books/addBook', null, {
            params: {
                title,
                language,
                name,
                lastname
            }
        });
        const data = response.data;
        res.status(200).json(data); // Zwróæ dane ksi¹¿ki jako odpowiedŸ JSON
    } catch (error) {
        console.error('B³¹d podczas dodawania ksi¹¿ki:', error.response.data);
        res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas dodawania ksi¹¿ki', details: error.response.data });
    }
});

app.post('/rentBook', async (req, res) => {
    const { bookId } = req.body;

    console.log("Przes³ane dane:", { bookId }); // Dodaj to

    try {
        const response = await axios.post(`http://localhost:8080/rental/rent?bookId=${bookId}`);
        const data = response.data;
        res.json(data); // Wyœlij dane jako odpowiedŸ JSON
    } catch (error) {
        console.error('B³¹d podczas wynajmowania ksi¹¿ki:', error);
        res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas wynajmowania ksi¹¿ki', details: error.response.data });
    }
});

app.post('/returnBook', async (req, res) => {
    const { loanId, bookId } = req.body;

    console.log("Przes³ane dane:", { loanId, bookId });

    try {
        const response = await axios.post(`http://localhost:8080/rental/return?loanId=${loanId}&bookId=${bookId}`);
        const data = response.data;
        res.json(data); // Wyœlij dane jako odpowiedŸ JSON
        console.log("Tutaj jestem")
    } catch (error) {
        console.error('B³¹d podczas zwracania ksi¹¿ki:', error);
        res.status(500).json({ error: 'Wyst¹pi³ b³¹d podczas zwracania ksi¹¿ki', details: error.response.data });
    }
});

app.get('/myRentals', async (req, res) => {
    const userId = req.query.userId;

    try {
        const response = await axios.get(`http://localhost:8080/rental/user?userId=${userId}`);
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
