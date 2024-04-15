import React, { useState } from 'react';
import axios from 'axios';

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
            await axios.post('http://localhost:3000/returnBook', { loanId: selectedReturn, bookId: bookId});
            alert('Książka została pomyślnie zwrócona!');
            setSelectedReturn(null); // Wyczyść wybraną książkę po zwróceniu
        } catch (error) {
            console.error('Błąd podczas zwracania książki:', error);
            alert('Wystąpił błąd podczas zwracania książki');
        }
    };

    return (
        <div>
            <h2>Wypożyczenia</h2>
            <table>
                <thead>
                <tr>
                    <th></th> {/* Pole na radio button */}
                    <th>Tytuł</th>
                    <th>Data zwrotu</th>
                    <th>Zwrot</th>
                </tr>
                </thead>
                <tbody>
                {rentals.map(rental => (
                    <tr key={rental.loanID}>
                        <td>
                            <input
                                type="radio"
                                name="selectedReturn"
                                value={rental.loanID}
                                checked={selectedReturn === rental.loanID}
                                onChange={() => setSelectedReturn(rental.loanID)}
                            />
                        </td>
                        <td>{rental.book.title}</td>
                        <td>{rental.returnDate}</td>
                        <td>{rental.returned ? 'Tak' : 'Nie'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleReturnButtonClick}>Zwróć zaznaczoną</button>
        </div>
    );
};

export default RentalList;
