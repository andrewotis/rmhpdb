
import Layout from "../Layouts/Layout";
import { Table, Pagination, Row, Col, Form, Container } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function IdeaOne({ auth }) {
    const getColSize = _ => ({ span: 4, offset: 4 });

    const values = {
        first_name: "",
        last_name: "",
        city: "",
        state: "",
        country: ""
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/search', values)
    }

    return (
        <Layout auth={auth}>
            <Container>
                <Col lg={getColSize()}>
                    <Row>
                        <Col lg="6">
                            <div className="home-cards" onClick={handleSubmit}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#0d6efd" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                                </svg><br />
                                Browse
                            </div>
                        </Col>
                        <Col lg="6">
                            <Link href="/" className="text-decoration-none">
                                <div className="home-cards">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#0d6efd" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                    </svg><br />
                                    Search
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Col>                
            </Container>
        </Layout>
    );
}
