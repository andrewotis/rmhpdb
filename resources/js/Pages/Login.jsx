import { useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import { Button, Form, Container, Alert, Row, Col } from 'react-bootstrap';
import AlertError from '../Components/AlertError';
import AlertSuccess from '../Components/AlertSuccess';

export default function Register(props) {
    const { errors } = usePage().props
    const { flash } = usePage().props

    const [values, setValues] = useState({
        email: "",
        password: "",
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
        router.post('/login', values)
    }

    return (
            <Container className="mt-5">
                <AlertSuccess flash={flash} />
                <AlertError errors={errors} />
                <Container id="main-container" className="d-grid h-100">
                    <Form id="sign-in-form" className="text-center w-100" noValidate onSubmit={handleSubmit}>
                    <h1 className="fs-3 fw-normal mb-3">Please sign in</h1>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                id="email" 
                                onChange={handleChange} 
                                value={values.email} 
                                type="email" 
                                placeholder="Email address"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                id="password" 
                                onChange={handleChange} 
                                value={values.password} 
                                type="password" 
                                placeholder="Password" 
                            />
                        </Form.Group>
                        {
                                props.errors.email && 
                                    <Alert key="danger" variant="danger">
                                        {props.errors.email}
                                    </Alert>
                            }
                        <Button className="w-100" variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Container>
            </Container>
            
    );
}