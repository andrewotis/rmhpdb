import NavBar from "../Components/NavBar";
import Container from 'react-bootstrap/Container';

export default function Layout({ auth, children }) {
    return (
        <>
            <NavBar auth={auth}/>
            <Container className="pt-5">
                {children}
            </Container>
            <div className="footer p-2">
            © 2024
            </div>
        </>
    );
}