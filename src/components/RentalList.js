import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { DataGrid } from '@mui/x-data-grid';
import {RainbowButton, RainbowDiv} from "./styles";

const RentalList = ({ rentals }) => {
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const handleReturnButtonClick = async () => {
        if (!rowSelectionModel.length) {
            alert('Proszę wybrać książkę do zwrócenia.');
            return;
        }

        const selectedRental = rentals.find(rental => rental.loanID === rowSelectionModel[0]);
        const bookId = selectedRental.book.bookId;

        try {
            await axios.post('http://localhost:3000/returnBook', { loanId: rowSelectionModel[0], bookId: bookId });
            alert('Książka została pomyślnie zwrócona!');
            setRowSelectionModel([]); // Wyczyść wybrany wiersz po zwróceniu
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
        <div style={{backgroundColor: 'white', borderRadius: '5px', padding: '10px'}}>
            <DataGrid
                rows={rentalRows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                rowSelectionModel={rowSelectionModel}
                onRowSelectionModelChange={(newSelection) => {
                    setRowSelectionModel(newSelection.length ? [newSelection[0]] : []);
                }}
            />
            <RainbowButton variant="outline-dark" onClick={handleReturnButtonClick}>Zwróć zaznaczoną</RainbowButton>
        </div>
    );
};

export default RentalList;
