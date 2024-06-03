import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { router, usePage } from '@inertiajs/react';
import { validate } from 'email-validator';
import Layout from '../Layouts/Layout';


export default function ContactForm({auth}) {
    const { flash } = usePage().props;
    const [values, setValues] = useState({
        name: '',
        email: '',
        verifyEmail: '',
        phone: '',
        message: '',        
    });

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
        router.post('/contact', values)
    }

    const getColSize = _ => {
        return {
            span: 4,
            offset: 4
        }
    }

    const inputValid = _ => {
        if(
            (values.name.length < 2) ||
            (values.phone.length < 8) ||
            (values.message.length < 5) ||
            (values.email.length < 5) ||
            (!validate(values.email))
        ) {
            return false;
        } else 
            return true;
    }

    const filterNumbers = e => {
        const filtered = e.target.value.replace(/[^0-9]/g, '');
        setValues(values => ({
            ...values,
            phone: filtered
        }));
    }

    return (
        <Layout auth={auth}>
            <Container>
                { flash.message !== null && 
                    <Alert variant="success">{flash.message}</Alert> }
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={getColSize()} className="text-center fs-5 mb-3">
                            Contact:
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={getColSize()}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="name"
                                placeholder="Please enter your name" 
                                value={values.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                id="email"
                                value={values.email}
                                placeholder="Please enter your email" 
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="d-none">
                            <Form.Label htmlFor="verifyEmail">Verify Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                id="verifyEmail"
                                value={values.verifyEmail}
                                placeholder="Please verify your email"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="phone">Phone</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="phone"
                                value={values.phone}
                                placeholder="Please enter your phone" 
                                onChange={filterNumbers}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="message">Message</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                id="message"
                                rows={4} 
                                placeholder="Please enter a message"
                                value={values.message}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        </Col>
                    </Row>                    
                    <Row>
                        <Col lg={getColSize()}>
                            <Button 
                                className="w-100"
                                disabled={!inputValid()}
                                onClick={handleSubmit}
                            >
                                Send
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Layout>
    );
}