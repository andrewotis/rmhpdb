import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import LayoutFour from '../Layouts/LayoutFour';
import ProgressBar from '../Components/ProgressBar';
import Button from '../Components/Button';
import NewRegisterStepOne from '../Components/NewRegister/NewRegisterStepOne';
import NewRegisterStepTwo from '../Components/NewRegister/NewRegisterStepTwo';
import NewRegisterStepThree from '../Components/NewRegister/NewRegisterStepThree';
import NewRegisterStepFour from '../Components/NewRegister/NewRegisterStepFour';
import NewRegisterStepFive from '../Components/NewRegister/NewRegisterStepFive';
import NewRegisterStepSix from '../Components/NewRegister/NewRegisterStepSix';
import NewRegisterStepSeven from '../Components/NewRegister/NewRegisterStepSeven';
import NewRegisterStepEight from '../Components/NewRegister/NewRegisterStepEight';
import LivePrivacySettingsPreview from '../Components/Account/LivePrivacySettingsPreview';
import { createPasswordValidatorSchema } from '../passwordTools';
import { transformAdminSettings } from '../transformTools';

export default function NewRegister({ auth, tokenRecord, credentials, categories, sectors, adminSettings }) {
    const [activeStep, setActiveStep] = useState(1);
    const [percentage, setPercentage] = useState(0);
    const [schema, setSchema] = useState(null);
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address_one: '',
        address_two: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        company: '',
        phone_number: '',
        credentials: [],
        sectors: [],
        categories: [],
        password: '',
        confirm_password: '',
        privacy_settings: {}
    });

    useEffect(() => {
        createPasswordValidatorSchema(setSchema);
    },[]);

    useEffect(() => {
        setValues({...values, 
            first_name: tokenRecord.first_name,
            last_name: tokenRecord.last_name,
            email: tokenRecord.email
        });
    },[tokenRecord]);

    useEffect(() => {
        switch(activeStep) {
            case 1:
                setPercentage(0);
                break;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                setPercentage(15.5 * (activeStep - 1));
                break;
            case 8:
                setPercentage(100);
                break;
        }
    }, [activeStep]);    

    const handleChange = e => {
        setValues({...values, [e.target.id] : e.target.value});
    }

    const currentStepInputValid = _ => {
        switch(activeStep) {
            case 2:
                return values.phone_number.replace(/[^0-9]/g, '').length > 9;
            case 3:
                return values.credentials.length > 0;
            case 4:
                return values.categories.length > 0;
            case 5:
                return values.sectors.length > 0;
            case 6:
                return schema.validate(values.password) && values.password == values.confirm_password;
            default:
                return true;
                break;
        }
    }

    const handleSubmit = _ => {
        router.post('/users', {...values, token: tokenRecord.token});
    }

    return (
        <LayoutFour auth={auth} title="Register" noPaddingUnderHeader>
            <ProgressBar percentage={percentage} text={activeStep == 1 ? '' : `Step ${activeStep}`}/>
                {   activeStep==7 &&
                    <LivePrivacySettingsPreview
                        display={activeStep==7} 
                        adminSettings={adminSettings} 
                        values={values}
                        credentials={credentials}
                        sectors={sectors}
                        categories={categories}
                        displayRegistrationDate={false}
                        displayRegistrationNumber={false}
                    />
                }
            <div className="registration-input-form-container">
                <p>Registration for <b>{ tokenRecord.first_name } { tokenRecord.last_name }</b>: <i>{ tokenRecord.email }</i></p>
                <form className="registration-input-form">
                    <NewRegisterStepOne 
                        values={values} 
                        handleChange={handleChange}
                        setValues={setValues}
                        display={activeStep == 1}
                    />
                    <NewRegisterStepTwo 
                        values={values} 
                        handleChange={handleChange}
                        setValues={setValues}
                        display={activeStep == 2}
                    />
                    <NewRegisterStepThree 
                        values={values} 
                        handleChange={handleChange}
                        setValues={setValues}
                        display={activeStep == 3}
                        credentials={credentials}
                    />
                    <NewRegisterStepFour 
                        values={values} 
                        handleChange={handleChange}
                        setValues={setValues}
                        display={activeStep == 4}
                        categories={categories}
                    />
                    <NewRegisterStepFive 
                        values={values} 
                        handleChange={handleChange}
                        setValues={setValues}
                        display={activeStep == 5}
                        sectors={sectors}
                    />
                    <NewRegisterStepSix 
                        values={values} 
                        handleChange={handleChange}
                        setValues={setValues}
                        display={activeStep == 6}
                        errors={
                            (values.password.length > 0 || values.confirm_password.length > 0) ? schema.validate(values.password, {details: true}) : undefined
                        }
                    />
                    <NewRegisterStepSeven
                        values={values}
                        setValues={setValues}
                        display={activeStep == 7}
                        tokenRecord={tokenRecord}
                        adminSettings={transformAdminSettings(adminSettings)}
                    />
                    <NewRegisterStepEight
                        values={values}
                        display={activeStep == 8}
                        tokenRecord={tokenRecord}
                    />
                    <div className="registration-input-form-controls">
                        <Button 
                            filled 
                            disabled={activeStep == 1}
                            onClick={activeStep !== 1 ? () => setActiveStep(activeStep - 1) : undefined}
                        >
                            Back
                        </Button>
                        { activeStep < 8 &&
                            <Button 
                                filled
                                disabled={!currentStepInputValid()}
                                onClick={currentStepInputValid() ? () => setActiveStep(activeStep + 1) : undefined}
                            >
                                Next
                            </Button>
                        }
                        { activeStep == 8 &&
                            <Button
                                filled
                                onClick={handleSubmit}
                            >
                                Register
                            </Button>
                        }
                    </div>                    
                </form>
            </div>
        </LayoutFour>
    );
}

