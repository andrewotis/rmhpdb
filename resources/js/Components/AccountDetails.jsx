import { useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { prettifyDate } from '../tools';

export default function AccountDetails({auth}) {
    const { errors } = usePage().props;
    const { flash } = usePage().props
    const [values, setValues] = useState(auth);

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/account', {
            'key' : 'account',
            'data' : values
        });
    }

    const handleChange = e => {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    return (
        <Form noValidate onSubmit={handleSubmit}>
            { errors.error && 
                <Alert variant="danger">
                    {errors.error}
                </Alert> }
            { flash.message && 
                <Alert variant="success">
                    {flash.message}
                </Alert> }
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Registration Number</Form.Label>
                <Col sm="10">
                    <Form.Control id="registration_number" disabled value={values.registration_number}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Registration Date</Form.Label>
                <Col sm="10">
                    <Form.Control id="created_at" disabled value={prettifyDate(values.created_at)}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">First Name/Last Name</Form.Label>
                <Col sm="5">
                    <Form.Control id="first_name" value={values.first_name} onChange={handleChange}/>
                </Col>
                <Col sm="5">
                    <Form.Control id="last_name" value={values.last_name} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Company</Form.Label>
                <Col sm="10">
                    <Form.Control id="company" value={values.company} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Address</Form.Label>
                <Col sm="10">
                    <Form.Control id="address" value={values.address} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Address2</Form.Label>
                <Col sm="10">
                    <Form.Control id="address2" value={values.address2 || ''} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">City/State/Zip</Form.Label>
                <Col sm="4">
                    <Form.Control id="city" value={values.city} onChange={handleChange}/>
                </Col>
                <Col sm="3">
                    <Form.Control id="state" value={values.state} onChange={handleChange}/>
                </Col>
                <Col sm="3">
                    <Form.Control id="zip" value={values.zip} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Country</Form.Label>
                <Col sm="10">
                    <Form.Control id="country" value={values.country} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Phone</Form.Label>
                <Col sm="10">
                    <Form.Control id="phone_number" value={values.phone_number} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Email</Form.Label>
                <Col sm="10">
                    <Form.Control id="email" value={values.email} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Button className="mt-3" onClick={handleSubmit}>Save Account Settings</Button>
        </Form>
    );
}