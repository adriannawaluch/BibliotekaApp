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

app.delete('/deleteBook', async (req, res) => {
    const bookId = req.query.bookId;

    try {
        const response = await axios.delete(`http://localhost:8080/api/books/deleteBook?bookId=${bookId}`);
        res.status(200).json({ message: 'Ksi��ka zosta�a pomy�lnie usuni�ta' });
    } catch (error) {
        console.error('B��d podczas usuwania ksi��ki:', error);
        res.status(500).json({ error: 'Wyst�pi� b��d podczas usuwania ksi��ki' });
    }
});

// Trasa POST dla newBook
app.post('/newBook', async (req, res) => {
    const { title, language, name, lastname } = req.body;

    console.log("Przes�ane dane:", { title, language, name, lastname }); // Dodaj to

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
        res.status(200).json(data); // Zwr�� dane ksi��ki jako odpowied� JSON
    } catch (error) {
        console.error('B��d podczas dodawania ksi��ki:', error.response.data);
        res.status(500).json({ error: 'Wyst�pi� b��d podczas dodawania ksi��ki', details: error.response.data });
    }
});

app.post('/rentBook', async (req, res) => {
    const { bookId } = req.body;

    console.log("Przes�ane dane:", { bookId }); // Dodaj to

    try {
        const response = await axios.post(`http://localhost:8080/rental/rent?bookId=${bookId}`);
        const data = response.data;
        res.json(data); // Wy�lij dane jako odpowied� JSON
    } catch (error) {
        console.error('B��d podczas wynajmowania ksi��ki:', error);
        res.status(500).json({ error: 'Wyst�pi� b��d podczas wynajmowania ksi��ki', details: error.response.data });
    }
});

app.post('/returnBook', async (req, res) => {
    const { loanId, bookId } = req.body;

    console.log("Przes�ane dane:", { loanId, bookId });

    try {
        const response = await axios.post(`http://localhost:8080/rental/return?loanId=${loanId}&bookId=${bookId}`);
        const data = response.data;
        res.json(data); // Wy�lij dane jako odpowied� JSON
        console.log("Tutaj jestem")
    } catch (error) {
        console.error('B��d podczas zwracania ksi��ki:', error);
        res.status(500).json({ error: 'Wyst�pi� b��d podczas zwracania ksi��ki', details: error.response.data });
    }
});

app.get('/myRentals', async (req, res) => {
    const userId = req.query.userId;

    try {
        const response = await axios.get(`http://localhost:8080/rental/user?userId=${userId}`);
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
