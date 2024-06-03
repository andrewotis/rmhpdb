import { Form, Button, Nav, Container, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from '@inertiajs/react'

export default function NavBar({auth}) {
    return (
        <Navbar bg="primary" sticky="top" className="text-white" expand="sm">
            <Container>
                <Navbar.Brand>
                    <Link href="/" className="text-white nav-link">RMHPdb</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0">
                        { auth === null && <Link href="/login" className="nav-link d-block d-sm-none text-white">
                            Login
                        </Link> }
                        <Link href="/contact" className="nav-link text-white">
                            Contact
                        </Link>
                        { auth === null && <Link href="/register" className="nav-link text-white">
                            Register
                        </Link> }
                    </Nav>
                    { auth === null &&
                        <Link href="/login" className="text-white nav-link d-none d-sm-block">
                            <Button variant="outline-light">
                                Login
                            </Button>
                        </Link>
                    }
                    { auth !== null &&
                        <NavDropdown title={auth.email} id="basic-nav-dropdown">
                            { auth.type == 'admin' && <NavDropdown.Item as="div"><Link href="/admin" className="nav-link">Admin Settings</Link></NavDropdown.Item> }
                            { auth.type == 'registered_mhp' && <NavDropdown.Item as="div"><Link href="/account" className="nav-link">My Account</Link></NavDropdown.Item> }
                            <NavDropdown.Item as="div">
                                <Link href="/logout" className="nav-link">Logout</Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
