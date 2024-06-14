import { Navbar, Container, Nav, NavDropdown, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import HeartIcon from '../Components/HeartIcon';

export default function LayoutThree({ children }) {

    return (
        <>
            <Navbar sticky="top" collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container id="layout3-nav-container">
                    <HeartIcon 
                        color="#471954"
                        height="50"
                        width="50"
                    />
                    <Navbar.Brand 
                        href="/"
                        className="ms-3"
                    >
                        RMHPdb
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#deets">
                                Search
                            </Nav.Link>
                            <Nav.Link href="#deets">
                                Register
                            </Nav.Link>
                            <Nav.Link href="#deets">
                                Contact
                            </Nav.Link>
                            <Nav.Link href="#memes">
                                Log In
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid id="layout3-content-container">
                <Container>
                    <Row className="pt-5">
                        <Col xl="7">
                            left
                        </Col>
                        <Col xl="5">
                            <img src="img/mom_daughter.png" />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className="pt-5">
                        <Col className="layout3-bar p-2">
                            sdfgsdfg
                        </Col>
                    </Row>
                </Container>
                
            </Container>
        </>
    );
}
