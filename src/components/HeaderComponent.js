import React from 'react';
import logo from './logo_horizontal.png';
import './HeaderComponent.css'; // Importuj plik stylów

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="Logo" className="logo" />
            <nav>
                <ul>
                    <li><a href="/myRentals">Moje konto</a></li>
                    <li><a href="/myRentals">Moje wypożyczenia</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
