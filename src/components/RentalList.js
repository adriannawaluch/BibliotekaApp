import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { DataGrid } from '@mui/x-data-grid';

const RentalList = ({ rentals }) => {
    const [selectedReturn, setSelectedReturn] = useState(null);

    const handleReturnButtonClick = async () => {
        if (!selectedReturn) {
            alert('Proszę wybrać książkę do zwrócenia.');
            return;
        }
        const selectedRental = rentals.find(rental => rental.loanID === selectedReturn);
        const bookId = selectedRental.book.bookId;
        try {
            await axios.post('http://localhost:3000/returnBook', { loanId: selectedReturn, bookId: bookId });
            alert('Książka została pomyślnie zwrócona!');
            setSelectedReturn(null); // Wyczyść wybraną książkę po zwróceniu
        } catch (error) {
            console.error('Błąd podczas zwracania książki:', error);
            alert('Wystąpił błąd podczas zwracania książki');
        }
    };

    const rentalRows = rentals.map(rental => ({
        ...rental,
        id: rental.loanID,
        title: rental.book.title,
        returnedText: rental.returned ? 'Tak' : 'Nie',
    }));

    const columns = [
        { field: 'loanID', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Tytuł', width: 130 },
        { field: 'returnDate', headerName: 'Data zwrotu', width: 130 },
        { field: 'returned', headerName: 'Zwrot', width: 130 },
    ];

    return (
        <div>
            <h2>Wypożyczenia</h2>
            <DataGrid
                rows={rentalRows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onSelectionModelChange={(newSelection) => {
                    setSelectedReturn(newSelection.selectionModel[0]);
                }}
            />
            <Button variant="outline-dark" onClick={handleReturnButtonClick}>Zwróć zaznaczoną</Button>
        </div>
    );
};

export default RentalList;
