import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { RainbowButton, RainbowDiv } from './styles'; // Importujemy stylowane komponenty


const BookList = ({ books }) => {
    const [selectedBook, setSelectedBook] = React.useState(null);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

    const handleDeleteButtonClick = async () => {
        if (!selectedBook) {
            alert('Proszę wybrać książkę do usunięcia.');
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/deleteBook?bookId=${selectedBook}`);
            alert('Książka została pomyślnie usunięta!');
            setSelectedBook(null);
            // Usuwamy również zaznaczenie wiersza po usunięciu książki
            setRowSelectionModel(rowSelectionModel.filter(id => id !== selectedBook));
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
            setSelectedBook(null);
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
        <div style={{height: '100%', width: '100%'}}>
            <div style={{backgroundColor: 'white', borderRadius: '5px', padding: '10px'}}>
                <DataGrid
                    rows={books.map(book => ({...book, id: book.bookId}))}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={(newSelection) => {
                        setRowSelectionModel(newSelection);
                        setSelectedBook(newSelection.length > 0 ? newSelection[0] : null);
                    }}
                />
            </div>
            <div>
                <RainbowButton variant="outline-dark" onClick={handleDeleteButtonClick}>Usuń zaznaczoną</RainbowButton>
                <RainbowButton variant="outline-dark" onClick={handleBorrowButtonClick} disabled={!selectedBook}>Wypożycz
                    zaznaczoną</RainbowButton>
            </div>
        </div>
    );
};

export default BookList;
