import { useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Container } from 'react-bootstrap';
import Layout from '../Layouts/Layout';
import { Stepper, Step } from 'react-form-stepper';
import RegisterAccountInfo from '../Components/RegisterAccountInfo';
import RegisterCredentials from '../Components/RegisterCredentials';
import RegisterCategories from '../Components/RegisterCategories';
import RegisterSectors from '../Components/RegisterSectors';

export default function Register(props) {
    const [activeStep, setActiveStep] = useState(0);
    const [stepsInfoValid, setStepsInfoValid] = useState({
        one: false,
        two: false,
        three: false,
        four: false
    });
    
    const [accountInfoValues, setAccountInfoValues] = useState({
        first_name: "",
        last_name: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        company: "",
        phone_number: "",
        email: "",
        password: "",
        password_confirmation: "",
      });

    const [credentialsValues, setCredentialsValues] = useState([]);
    const [categoriesValues, setCategoriesValues] = useState({});
    const [sectorsValues, setSectorsValues] = useState({});

    function handleSubmit(e) {
        e.preventDefault();
        router.post('/users', {
            account: accountInfoValues,
            credentials: credentialsValues,
            categories: categoriesValues,
            sectors: sectorsValues
        });
    }

    return (
        <>
            <Layout auth={props.auth}>
                <Form noValidate onSubmit={handleSubmit}>
                    <Stepper 
                        activeStep={activeStep}
                        styleConfig={{
                            activeBgColor: '#2b7cff',
                            activeTextColor: '#fff',
                            inactiveBgColor: '#fff',
                            inactiveTextColor: '#2b7cff',
                            completedBgColor: '#fff',
                            completedTextColor: '#2b7cff',
                            size: '3em'
                        }}
                        className={'stepper'}
                        stepClassName={'stepper__step'}
                    >
                        <Step label="Account Info" />
                        <Step label="Credentials" />
                        <Step label="Categories" />
                        <Step label="Industry Sector" />
                    </Stepper>
                    <Container>
                        <RegisterAccountInfo
                            display={activeStep==0}
                            stepsInfoValid={stepsInfoValid}
                            setStepsInfoValid={setStepsInfoValid}
                            accountInfoValues={accountInfoValues}
                            setAccountInfoValues={setAccountInfoValues}
                        />
                        <RegisterCredentials
                            display={activeStep==1}
                            stepsInfoValid={stepsInfoValid}
                            setStepsInfoValid={setStepsInfoValid}
                            credentialsValues={credentialsValues}
                            setCredentialsValues={setCredentialsValues}
                            credentials={props.credentials}
                        />
                        <RegisterCategories
                            display={activeStep==2}
                            stepsInfoValid={stepsInfoValid}
                            setStepsInfoValid={setStepsInfoValid}
                            categoriesValues={categoriesValues}
                            setCategoriesValues={setCategoriesValues}
                            categories={props.categories}
                        />
                        <RegisterSectors
                            display={activeStep==3}
                            stepsInfoValid={stepsInfoValid}
                            setStepsInfoValid={setStepsInfoValid}
                            sectorsValues={sectorsValues}
                            setSectorsValues={setSectorsValues}
                            sectors={props.sectors}
                        />
                        <Row>
                        <Col sm={{ span: 4, offset: 4 }} className="text-center">
                            <Button 
                                className="w-25 m-1"
                                disabled={activeStep == 0}
                                onClick={() => setActiveStep(activeStep-1)}
                                variant="outline-primary"
                            >
                                Back
                            </Button>
                            <Button 
                                className={`${activeStep==3 ? 'd-none' : ''} w-25 m-1`}
                                onClick={
                                    () => activeStep < 3 && setActiveStep(activeStep+1)
                                }
                                disabled={
                                    (activeStep==0 && stepsInfoValid.one == false) ||
                                    (activeStep==1 && stepsInfoValid.two == false) ||
                                    (activeStep==2 && stepsInfoValid.three == false) 
                                }
                            >
                                Next
                            </Button>
                            <Button
                                className={`${activeStep!=3 ? 'd-none' : ''} w-25 m-1`}
                                onClick={handleSubmit}
                                disabled={activeStep==3 && stepsInfoValid.four == false}
                            >
                                Register
                            </Button>
                        </Col>
                        </Row>
                    </Container>
                </Form>
            </Layout>
        </>
    )
}
