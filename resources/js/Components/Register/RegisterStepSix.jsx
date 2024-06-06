import { useEffect, useState } from 'react';
import { Container, Col, Row, FloatingLabel, Form, Alert } from 'react-bootstrap';
import Select from 'react-select';

export default function RegisterStepSix({ values, setValues, display, errors }) {
    const getColSize = _ => ({ span: 4, offset: 4 })

    return (
        <Container className={`${!display ? 'd-none' : ''}`}>
            {
                (values.password.length > 0 || values.confirm_password.length > 0) && (values.password !== values.confirm_password || errors.length > 0)
                &&
                <Row>
                    <Col lg={getColSize()}>
                        <Alert variant='danger' className="fs-6">
                            {
                                values.password !== values.confirm_password && <>Passwords do not match<br /></>
                            }
                            {
                                errors.map(err => <>{err.message}<br /></>)
                            }
                        </Alert>
                    </Col>
                </Row>
            }
            <Row>
                <Col lg={getColSize()}>
                    <FloatingLabel
                        htmlFor="password"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            id="password"
                            value={values.password}
                            onChange={(e) => setValues({...values, password: e.target.value})}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col lg={getColSize()}>
                    <FloatingLabel
                        htmlFor="confirm_password"
                        label="Confirm Password"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            id="confirm_password"
                            value={values.confirm_password}
                            onChange={(e) => setValues({...values, confirm_password: e.target.value})}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
        </Container>
    );
}
