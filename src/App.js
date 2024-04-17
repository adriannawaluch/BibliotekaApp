import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import BookList from './components/BookList';
import Header from './components/HeaderComponent';
import RentalList from "./components/RentalList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RainbowButton, RainbowDiv } from './components/styles';

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
        <RainbowDiv style={{ margin: '20px' }}>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<BookList books={books} />} />
                    <Route path="/myRentals" element={<RentalList rentals={rentals} />} />
                </Routes>
            </BrowserRouter>
        </RainbowDiv>
    );
};

export default App;
