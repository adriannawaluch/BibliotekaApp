import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BrowserRouter,
    Routes, // instead of "Switch"
    Route,
} from "react-router-dom";
import BookList from './components/BookList';
import Header from './components/HeaderComponent'; // Zaimportuj komponent BookList
import RentalList from "./components/RentalList"; // Zaimportuj logo
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [books, setBooks] = useState([]);
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/all');
                setBooks(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        };

        const fetchRentals = async () => {
            try {
                const response = await axios.get('http://localhost:3000/myRentals?userId=1');
                setRentals(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych o wypożyczeniach:', error);
            }
        };

        fetchBooks();
        fetchRentals();
    }, []);

    return (
        <div>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<BookList books={books} />} />
                    <Route path="/myRentals" element={<RentalList rentals={rentals} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
