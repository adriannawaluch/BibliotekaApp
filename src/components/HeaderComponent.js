import React from 'react';
import logo from './logo_horizontal.png';
import './HeaderComponent.css';
import Menu from'./Menu'


const Header = () => {
    return (
        <div className="header">
            <Menu/>
            <img src={logo} alt="Logo" className="logo"/>
        </div>
    );
}

export default Header;
