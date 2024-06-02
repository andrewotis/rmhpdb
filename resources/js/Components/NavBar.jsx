import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from '@inertiajs/react'

export default function NavBar({auth}) {
  return (
    <Navbar bg="primary" sticky="top" className="text-white">
        <Container>
          <Navbar.Brand href="/" className="text-white">RMHPdb</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            {auth !== null &&
                <NavDropdown title={auth.email} id="basic-nav-dropdown">
                    {auth.type == 'admin' && <NavDropdown.Item as="div"><Link href="/admin" className="nav-link">Admin Settings</Link></NavDropdown.Item>}
                    {auth.type == 'registered_mhp' && <NavDropdown.Item as="div"><Link href="/account" className="nav-link">My Account</Link></NavDropdown.Item>}
                    <NavDropdown.Item as="div">
                        <Link href="/logout" className="nav-link">Logout</Link>
                    </NavDropdown.Item>
                </NavDropdown>
            }
            {auth === null &&
                <Nav>
                    <Link href="/register" className="text-white nav-link">Register</Link>
                    <Link href="/login" className="text-white nav-link">Login</Link>
                </Nav>
            }            
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
