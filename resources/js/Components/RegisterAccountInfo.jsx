import { useEffect, useState, useRef } from 'react';
import { validate } from 'email-validator';
import passwordValidator from 'password-validator';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import axios from 'axios';

export default function RegisterAccountInfo({ display, stepsInfoValid, setStepsInfoValid, accountInfoValues, setAccountInfoValues }) {
    const [schema, setSchema] = useState(null);
    const [emailTaken, setEmailTaken] = useState(false);

    useEffect(() => {
        createPasswordValidatorSchema();
    },[]);

    useEffect(() => {
        if(validate(accountInfoValues.email)) {
            axios.post(`/account/email`, { email: accountInfoValues.email })
            .then(res => {
                if(res.data == 0) {
                    setEmailTaken(true);
                } else if(res.data == 1) {
                    setEmailTaken(false);
                }
            })
        }
    }, [accountInfoValues.email]);

    useEffect(() => {
        if(inputValid()) {
            setStepsInfoValid({...stepsInfoValid, one: true});
        } else {
            setStepsInfoValid({...stepsInfoValid, one: false});
        }
    }, [accountInfoValues, emailTaken]);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setAccountInfoValues(values => ({
            ...values,
            [key]: value,
        }));
    }

    const createPasswordValidatorSchema = _ => {
        var s = new passwordValidator();
        s
            .is().min(8)
            .has().uppercase()
            .has().lowercase()
            .has().digits(1)
            .has().not().spaces()
        return setSchema(s);
    }

    const inputValid = _ => {
        if(
            (accountInfoValues.first_name.length < 1) ||
            (accountInfoValues.last_name.length < 1) ||
            (accountInfoValues.address.length < 4) ||
            (accountInfoValues.city.length < 4) ||
            (accountInfoValues.state.length < 2) ||
            (accountInfoValues.zip.length < 5) ||
            (accountInfoValues.country.length < 2) ||
            (accountInfoValues.company.length < 3) ||
            (accountInfoValues.phone_number.length < 10) ||
            (!validate(accountInfoValues.email)) ||
            (!schema.validate(accountInfoValues.password) || accountInfoValues.password !== accountInfoValues.password_confirmation) ||
            (emailTaken == true)
        ) {
            return false;
        }
        
        return true;
    }

    const filterNumbers = e => {
        const filtered = e.target.value.replace(/[^0-9]/g, '');
        setAccountInfoValues(values => ({
            ...values,
            phone_number: filtered
        }));
    }

    const showErrors = _ => {
        if(accountInfoValues.password.length > 0 || accountInfoValues.password_confirmation.length > 0) {
            if(accountInfoValues.password !== accountInfoValues.password_confirmation) {
                return (
                    <Alert variant="danger">Passwords do not match</Alert>
                ); 
            } else if(!schema.validate(accountInfoValues.password))  {
                return (
                    <Alert variant="danger">
                        {
                            schema.validate(accountInfoValues.password, { details: true }).map(err => {
                                return <>{err.message.replace('string', 'password')}<br /></>
                            })
                        }
                    </Alert>
                );
            }
        }
        if(emailTaken) {
            return (
                <Alert variant="danger">Email address already registered</Alert>
            );
        }
    }

    return (
        <Container className={!display ? 'd-none' : ''}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">First name/Last name</Form.Label>
                <Col sm="5">
                    <Form.Control id="first_name" onChange={handleChange} value={accountInfoValues.first_name} type="text" placeholder="Enter first name" />
                </Col>
                <Col sm="5">
                    <Form.Control id="last_name" onChange={handleChange} value={accountInfoValues.last_name} type="text" placeholder="Enter last name" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Address</Form.Label>
                <Col sm="10">
                    <Form.Control id="address" onChange={handleChange} value={accountInfoValues.address} type="text" placeholder="Enter address" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Address2</Form.Label>
                <Col sm="10">
                    <Form.Control id="address2" onChange={handleChange} value={accountInfoValues.address2} type="text" placeholder="Enter address2" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">City/State/Zip</Form.Label>
                <Col sm="4">
                    <Form.Control id="city" onChange={handleChange} value={accountInfoValues.city} type="text" placeholder="Enter city" />
                </Col>
                <Col sm="3">
                    <Form.Control id="state" onChange={handleChange} value={accountInfoValues.state} type="text" placeholder="Enter state" />
                </Col>
                <Col sm="3">
                    <Form.Control id="zip" onChange={handleChange} value={accountInfoValues.zip} type="text" placeholder="Enter zip" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Country</Form.Label>
                <Col sm="10">
                    <Form.Control id="country" onChange={handleChange} value={accountInfoValues.country} type="text" placeholder="Enter country" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Company</Form.Label>
                <Col sm="10">
                    <Form.Control id="company" onChange={handleChange} value={accountInfoValues.company} type="text" placeholder="Enter company" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Phone</Form.Label>
                <Col sm="10">
                    <Form.Control id="phone" onChange={filterNumbers} value={accountInfoValues.phone_number} type="text" placeholder="Enter phone" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Email</Form.Label>
                <Col sm="10">
                    <Form.Control id="email" onChange={handleChange} value={accountInfoValues.email} type="text" placeholder="Enter email" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Col sm="10">
                    <Form.Control id="password" onChange={handleChange} value={accountInfoValues.password} type="password" placeholder="Enter password" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Verify Password</Form.Label>
                <Col sm="10">
                    <Form.Control id="password_confirmation" onChange={handleChange} value={accountInfoValues.password_confirmation} type="password" placeholder="Verify password" />
                </Col>
            </Form.Group>
            {
                showErrors()             
            }
        </Container>
    );
}