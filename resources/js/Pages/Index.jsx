import { useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import Layout from "../Layouts/Layout";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

export default function Index({ auth }) {
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        city: "",
        state: "",
        country: ""
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/search', values)
    }

    const getColSize = _ => {
        return {
            span: 4,
            offset: 4
        }
    }

    return (
        <Layout auth={auth}>
            <Container>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={getColSize()} className="text-center fs-5 mb-3">
                            Search the database:
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={getColSize()}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="First Name"
                                className="mb-3 mt-2"
                            >
                                <Form.Control 
                                    id="first_name"
                                    onChange={handleChange} 
                                    value={values.first_name} 
                                    type="text" 
                                    placeholder="First Name" 
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={getColSize()}>
                            <FloatingLabel 
                                controlId="floatingPassword" 
                                label="Last Name" 
                                className="mb-3"
                            >
                                <Form.Control 
                                    id="last_name"
                                    onChange={handleChange} 
                                    value={values.last_name} 
                                    type="text" 
                                    placeholder="Last Name" 
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={getColSize()}>
                            <FloatingLabel 
                                controlId="floatingPassword" 
                                label="City" 
                                className="mb-3"
                            >
                                <Form.Control 
                                    id="city"
                                    onChange={handleChange} 
                                    value={values.city} 
                                    type="text" 
                                    placeholder="City" 
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={getColSize()}>
                            <FloatingLabel 
                                controlId="floatingPassword" 
                                label="State" 
                                className="mb-3"
                            >
                                <Form.Control 
                                    id="state"
                                    onChange={handleChange} 
                                    value={values.state} 
                                    type="text" 
                                    placeholder="State" 
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={getColSize()}>
                            <FloatingLabel 
                                controlId="floatingPassword" 
                                label="Country" 
                                className="mb-3"
                            >
                                <Form.Control 
                                    id="country"
                                    onChange={handleChange} 
                                    value={values.country} 
                                    type="text" 
                                    placeholder="Country" 
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={getColSize()}>
                            <Button 
                                variant="primary" 
                                type="submit" 
                                className="w-100"
                                onClick={handleSubmit}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Layout>
    )
}
