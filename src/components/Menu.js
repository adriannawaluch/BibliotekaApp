import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    const handleMouseLeave = () => {
        if (!isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <Navbar variant="outline-light" bg="light" expand="lg" onMouseLeave={handleMouseLeave}>
            <Container fluid>
                <Navbar.Brand href="/">Strona główna</Navbar.Brand>
                <Navbar.Toggle onClick={handleMenuToggle} aria-controls="navbar-light-example" />
                <Navbar.Collapse id="navbar-light-example" className={`${isMenuOpen ? 'show' : ''}`}>
                    <Nav>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Więcej"
                            menuVariant="dark"
                            show={isMenuOpen}
                            onMouseEnter={handleMenuToggle}
                            onMouseLeave={handleMenuClose}
                        >
                            <NavDropdown.Item href="/myRentals">Moje konto</NavDropdown.Item>
                            <NavDropdown.Item href="/myRentals">
                                Moje wypożyczenia
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Menu;