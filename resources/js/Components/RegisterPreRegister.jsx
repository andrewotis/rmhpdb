import { useState, useEffect } from 'react'
import { router, usePage } from '@inertiajs/react';
import { Form, Button, Container, Col, Row, FloatingLabel, Alert } from 'react-bootstrap';
import { validate } from 'email-validator';

export default function RegisterPreRegister({}) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;

    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        if(flash.message !== null && flash.message.includes('A verification email has been sent')) setEmailSent(true);
    },[flash]);

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    const handleChange = e => {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }

    const getColSize = _ => {
        return {
            span: 4,
            offset: 4
        }
    }

    const registerButton = _ => {
        router.post('/register', values);
    }

    return (
        <Container>
            <Row>
                <Col lg={getColSize()}>
                    <Container className="page-header">
                        Register
                    </Container>
                </Col>
            </Row>
            { errors.error && 
                <Row>
                    <Col lg={getColSize()}>
                        <Alert variant='danger'>
                            {errors.error}
                        </Alert>
                    </Col>
                </Row>
            }
            { flash.message &&
                <Row>
                    <Col lg={getColSize()}>
                        <Alert variant='success'>
                            {flash.message}
                        </Alert>
                    </Col>
                </Row>
            }
            <Row>
                <Col lg={getColSize()}>
                    <FloatingLabel
                        htmlFor="first_name"
                        label="First Name"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            placeholder="First Name" 
                            id="first_name"
                            value={values.first_name}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <FloatingLabel
                        htmlFor="last_name"
                        label="Last Name"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            placeholder="Last Name" 
                            id="last_name"
                            value={values.last_name}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <FloatingLabel
                        htmlFor="email"
                        label="Email Address"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="text" 
                            placeholder="Email Address" 
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <Button
                        className="w-100"
                        disabled={!validate(values.email) || values.first_name.length < 2 || values.last_name.length < 2 || emailSent}
                        onClick={registerButton}
                    >
                        Register
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}