import { useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function AccountPassword({auth}) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;
    const [values, setValues] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/account', {
            'key' : 'password',
            'data' : {
                ...values,
                ...auth
            }
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

    const validateInput = _ => {
        if(values.confirm_password == '' || values.current_password == '' || values.new_password == '') {
            return true;
        }
        if(values.new_password != values.confirm_password) {
            return true;
        }
        if(values.new_password == values.current_password) {
            return true;
        }
        return false;
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
                <Form.Label column sm="2">Current Password</Form.Label>
                <Col sm="10">
                    <Form.Control id="current_password" type="password" value={values.current_password} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">New Password</Form.Label>
                <Col sm="10">
                    <Form.Control id="new_password" type="password" value={values.new_password} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Confirm New Password</Form.Label>
                <Col sm="10">
                    <Form.Control id="confirm_password" type="password" value={values.confirm_password} onChange={handleChange}/>
                </Col>
            </Form.Group>
            <Button className="mt-3" disabled={validateInput()} onClick={handleSubmit}>Save Password</Button>
        </Form>
    );
}