import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import Layout from '../Layouts/Layout';
import { Stepper, Step } from 'react-form-stepper';
import RegisterPreRegister from '../Components/Register/RegisterPreRegister';
import RegisterStepOne from '../Components/Register/RegisterStepOne';
import RegisterStepTwo from '../Components/Register/RegisterStepTwo';
import RegisterStepThree from '../Components/Register/RegisterStepThree';
import RegisterStepFour from '../Components/Register/RegisterStepFour';
import RegisterStepFive from '../Components/Register/RegisterStepFive';
import RegisterStepSix from '../Components/Register/RegisterStepSix';
import RegisterStepSeven from '../Components/Register/RegisterStepSeven';
import passwordValidator from 'password-validator';
import AlertError from '../Components/AlertError';

export default function Register({ auth, initial, tokenRecord, credentials, categories, sectors }) {
    const { errors } = usePage().props
    const [activeStep, setActiveStep] = useState(0);
    const [schema, setSchema] = useState(null);

    useEffect(() => {
        createPasswordValidatorSchema();
    },[]);

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

    const [values, setValues] = useState({
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        company: '',
        phone_number: '',
        credentials: [],
        categories: [],
        sectors: [],
        password: '',
        confirm_password: ''
    });

    const getColSize = _ => ({ span: 4, offset: 4 })

    if(initial) {
        return (
            <Layout auth={auth}>
                <RegisterPreRegister />
            </Layout>
        );
    }

    const handleSubmit = _ => {
        router.post('/users', {...values, token: tokenRecord.token});
    }

    return (
        <Layout auth={auth}>
            <Container className="text-center">
                Registration for { tokenRecord.first_name } { tokenRecord.last_name } - { tokenRecord.email }<br />
            </Container>
            <Stepper 
                activeStep={activeStep}
                styleConfig={{
                    activeBgColor: '#2b7cff',
                    activeTextColor: '#fff',
                    inactiveBgColor: '#fff',
                    inactiveTextColor: '#2b7cff',
                    completedBgColor: '#fff',
                    completedTextColor: '#2b7cff',
                    size: '1.7em'
                }}
                className={'stepper'}
                stepClassName={'stepper__step'}
            >
                <Step label="" />
                <Step label="" />
                <Step label="" />
                <Step label="" />
                <Step label="" />
                <Step label="" />
                <Step label="" />
            </Stepper>
            <RegisterStepOne
                values={values}
                setValues={setValues}
                display={activeStep==0}
            />
            <RegisterStepTwo
                values={values}
                setValues={setValues}
                display={activeStep==1}
            />
            <RegisterStepThree
                values={values}
                setValues={setValues}
                display={activeStep==2}
                credentials={credentials}
            />
            <RegisterStepFour
                values={values}
                setValues={setValues}
                display={activeStep==3}
                categories={categories}
            />
            <RegisterStepFive
                values={values}
                setValues={setValues}
                display={activeStep==4}
                sectors={sectors}
            />
            <RegisterStepSix
                values={values}
                setValues={setValues}
                display={activeStep==5}
                errors={schema && schema.validate(values.password, {details: true})}
            />
            <RegisterStepSeven
                values={values}
                display={activeStep==6}
                tokenRecord={tokenRecord}
            />

            <Container>
                <Row>
                    <Col lg={getColSize()}>
                        <Row>
                            <Col>
                                <Button 
                                    variant="outline-primary" 
                                    className="w-100"
                                    onClick={() => setActiveStep(activeStep-1)}
                                    disabled={activeStep==0}
                                >
                                    Back
                                </Button>
                            </Col>
                            <Col>
                                { 
                                    activeStep < 6 &&
                                    <Button 
                                        className="w-100"
                                        onClick={() => setActiveStep(activeStep+1)}
                                        disabled={
                                            (activeStep==1 && values.phone_number.replace(/[^0-9]/g, '').length < 10) ||
                                            (activeStep==2 && values.credentials.length == 0) ||
                                            (activeStep==3 && values.categories.length == 0) ||
                                            (activeStep==4 && values.sectors.length == 0) ||
                                            (activeStep==5 && !schema.validate(values.password)) ||
                                            (activeStep==5 && values.password !== values.confirm_password)
                                        }
                                    >
                                        {activeStep < 5 ? 'Next' : 'Review'}
                                    </Button>
                                }
                                {
                                    activeStep == 6 &&
                                    <Button
                                        className="w-100"
                                        onClick={handleSubmit}
                                    >
                                        Register
                                    </Button>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
