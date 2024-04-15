import React, { useState } from 'react';
import axios from 'axios';

const BookList = ({ books }) => {
    const [selectedBook, setSelectedBook] = useState(null);

    const handleDeleteButtonClick = async () => {
        if (!selectedBook) {
            alert('Proszę wybrać książkę do usunięcia.');
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/deleteBook?bookId=${selectedBook}`);
            alert('Książka została pomyślnie usunięta!');
            setSelectedBook(null); // Wyczyść wybraną książkę po usunięciu
        } catch (error) {
            console.error('Błąd podczas usuwania książki:', error);
            alert('Wystąpił błąd podczas usuwania książki');
        }
    };

    const handleBorrowButtonClick = async () => {
        if (!selectedBook) {
            alert('Proszę wybrać książkę do wypożyczenia.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/rentBook', { bookId: selectedBook });
            alert('Książka została pomyślnie wypożyczona!');
            setSelectedBook(null); // Wyczyść wybraną książkę po wypożyczeniu
        } catch (error) {
            console.error('Błąd podczas wypożyczania książki:', error);
            alert('Wystąpił błąd podczas wypożyczania książki');
        }
    };

    return (
        <div>
            <h2>Lista Książek</h2>
            <table>
                <thead>
                <tr>
                    <th></th> {/* Pole na radio button */}
                    <th>Tytuł</th>
                    <th>Język</th>
                    <th>Autor</th>
                    <th>Dostępność</th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => (
                    <tr key={book.bookId}>
                        <td>
                            <input
                                type="radio"
                                name="selectedBook"
                                value={book.bookId}
                                checked={selectedBook === book.bookId}
                                onChange={() => setSelectedBook(book.bookId)}
                            />
                        </td>
                        <td>{book.title}</td>
                        <td>{book.language}</td>
                        <td>{book.authorsList.join(', ')}</td>
                        <td>{book.availability}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleDeleteButtonClick}>Usuń zaznaczoną</button>
            <button onClick={handleBorrowButtonClick}>Wypożycz zaznaczoną</button>
        </div>
    );
};

export default BookList;
