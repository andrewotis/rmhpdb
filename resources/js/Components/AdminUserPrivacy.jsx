import { useState, useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import { Container, Form, Button, Row, Col, Nav } from 'react-bootstrap';

export default function AdminUserPrivacy({ auth, settings, display }) {
    const [values, setValues] = useState({
        first_name: false,
        last_name: false,
        company: false,
        address: false,
        address2: false,
        city: false,
        state: false,
        zip: false,
        country: false,
        phone_number: false,
        email: false
    });

    useEffect(() => {
        settings.map(setting => {
            setValues(values => ({
                ...values,
                [setting.key]: setting.value == 'true' ? true : false,
            }))
        });
    }, []);

    function handleChange(e) {
        const key = e.target.id;
        setValues(values => ({
            ...values,
            [key]: !values[key],
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/admin', values)
    }

    return (
        <Container className={!display ? 'd-none' : ''}>
            <Container className="m-3">
                Allow users to set these fields to private:
            </Container>
                        
            <Form className="w-25" noValidate onSubmit={handleSubmit}>
                <Form.Check 
                    type="switch"
                    id="first_name"
                    label="First Name"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.first_name}
                />
                <Form.Check 
                    type="switch"
                    id="last_name"
                    label="Last Name"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.last_name}
                />
                <Form.Check 
                    type="switch"
                    id="company"
                    label="Company"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.company}
                />
                <Form.Check 
                    type="switch"
                    id="address"
                    label="Address"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.address}
                />
                <Form.Check 
                    type="switch"
                    id="address2"
                    label="Address2"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.address2}
                />
                <Form.Check 
                    type="switch"
                    id="city"
                    label="City"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.city}
                />
                <Form.Check 
                    type="switch"
                    id="state"
                    label="State"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.state}
                />
                <Form.Check 
                    type="switch"
                    id="zip"
                    label="Zip"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.zip}
                />
                <Form.Check 
                    type="switch"
                    id="country"
                    label="Country"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.country}
                />
                <Form.Check 
                    type="switch"
                    id="phone_number"
                    label="Phone"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.phone_number}
                />
                <Form.Check 
                    type="switch"
                    id="email"
                    label="Email"
                    className="mb-3"
                    onChange={handleChange}
                    checked={values.email}
                />
                <Button className="w-100" variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </Container>
    );
}