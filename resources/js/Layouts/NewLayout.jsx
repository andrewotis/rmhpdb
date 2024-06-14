import { Navbar, Container, Nav } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function NewLayout({ children }) {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const navBarHeight = 80;

    useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
          setHeight(window.innerHeight)
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        console.log({width: width, height: height});
    },[width]);

    return (
        <>
            <Navbar 
                expand="lg" 
                sticky="top" 
                style={{
                    padding: '0px', 
                    height: `${navBarHeight}px`, 
                    width: '100%', 
                    backgroundColor: "#fff",
                    textTransform: 'uppercase'
                }}>
                <Container fluid className="p-0 m-0" style={{width: '100%', height: '100%'}}>
                    <Navbar.Brand href="#home" style={{backgroundColor: "#e55ffe", height: '100%', padding: '18px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#FFFFFF" className="bi bi-heart-pulse" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857q.09.083.176.171a3 3 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01zM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5"/>
                            <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162z"/>
                        </svg>
                    </Navbar.Brand>
                        <Container 
                            style={{
                                fontSize: '1.8rem', 
                                fontWeight: 'bold', 
                                color: "#461954"
                            }}>
                            RMHPdb
                        </Container>
                    <Navbar.Toggle style={{backgroundColor: "#e55ffe"}}/>
                    <Navbar.Collapse className="justify-content-end" style={{height: '100%'}}>
                        <Nav 
                            className="me-auto"
                            style={{
                                color: "#461954"
                            }}
                        >
                            <Nav.Link style={{marginRight: '20px'}} href="#home">Register</Nav.Link>
                            <Nav.Link style={{marginRight: '20px'}} href="#features">Search</Nav.Link>
                            <Nav.Link style={{marginRight: '20px'}} href="#pricing">Contact</Nav.Link>
                        </Nav>
                        <Navbar.Text 
                            style={{
                                backgroundColor: "#461954",
                                height: '100%',
                                width: '200px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFF',
                                marginLeft: '20px'
                            }}>
                            Log In
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div
                style={{
                    display: 'table',
                    height: `${height - navBarHeight}px`,
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'table-row',
                    }}
                >
                    <div
                        style={{
                            display: 'table-cell',
                            width: '76px',
                            backgroundColor: "#461954",
                        }}
                    >

                    </div>
                    <div
                        style={{
                            display: 'table-cell',
                            width: 'auto',
                            background: 'url("img/1 (2).jpg")',
                            backgroundSize: "100%",
                            backgroundRepeat: 'no-repeat'

                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
