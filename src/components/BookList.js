import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const BookList = ({ books }) => {
    const [selectedBook, setSelectedBook] = React.useState(null);

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

    const columns = [
        { field: 'bookId', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Tytuł', width: 130 },
        { field: 'language', headerName: 'Język', width: 130 },
        { field: 'authorsList', headerName: 'Autor', width: 130 },
        { field: 'availability', headerName: 'Dostępność', width: 130 },
    ];

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={books.map(book => ({ ...book, id: book.bookId }))} // Dodajemy id do każdego wiersza
                columns={columns}
                pageSize={5}
                checkboxSelection
                onSelectionModelChange={(newSelection) => {
                    setSelectedBook(newSelection.selectionModel[0]);
                }}
            />
            <div>
                <Button variant="outline-dark" onClick={handleDeleteButtonClick}>Usuń zaznaczoną</Button>
                <Button variant="outline-dark" onClick={handleBorrowButtonClick}>Wypożycz zaznaczoną</Button>
            </div>
        </div>
    );
};

export default BookList;
