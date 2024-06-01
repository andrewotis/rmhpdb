import { useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import Layout from "../Layouts/Layout";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

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
    return (
        <Layout auth={auth}>
            <Container className="w-25">
                <h2 className="mt-2 mb-4">Search the database</h2>
                <Form noValidate onSubmit={handleSubmit}>
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
                    <FloatingLabel controlId="floatingPassword" label="Last Name" className="mb-3">
                        <Form.Control 
                            id="last_name"
                            onChange={handleChange} 
                            value={values.last_name} 
                            type="text" 
                            placeholder="Last Name" 
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="City" className="mb-3">
                        <Form.Control 
                            id="city"
                            onChange={handleChange} 
                            value={values.city} 
                            type="text" 
                            placeholder="City" 
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="State" className="mb-3">
                        <Form.Control 
                            id="state"
                            onChange={handleChange} 
                            value={values.state} 
                            type="text" 
                            placeholder="State" 
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Country" className="mb-3">
                        <Form.Control 
                            id="country"
                            onChange={handleChange} 
                            value={values.country} 
                            type="text" 
                            placeholder="Country" 
                        />
                    </FloatingLabel>
                    <Button variant="primary" type="submit" className="w-100">
                        Search
                    </Button>
                </Form>
            </Container>
        </Layout>
    )
}
