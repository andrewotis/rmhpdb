import { useState } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import LayoutFour from '../Layouts/LayoutFour';
import FloatingLabelInput from '../Components/FloatingLabelInput';
import Button from '../Components/Button';
import Flash from '../Components/Flash';

export default function NewLogin({ auth }) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        setValues({...values, [e.target.id] : e.target.value});
    }

    const handleSubmit = _ => {
        router.post('/login', values);
    }

    const valid = _ => values.email.length > 0 && values.password.length > 0;

    return (
        <LayoutFour title="Login" auth={auth}>
            { flash.message && <Flash type="success" message={flash.message}/> }
            { errors.error && <Flash type="error" message={errors.error}/> }

            <div className="registration-container">
                <form className="registration-form">
                    <FloatingLabelInput 
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                    />
                    <FloatingLabelInput 
                        type="password"
                        label="Password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                    <div className="login-controls">
                        <div className="forgot-password">
                            <Link href="/account/password/forgot">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="login-button">
                            <Button 
                                filled
                                disabled={!valid()}
                                onClick={valid() ? handleSubmit : undefined}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </LayoutFour>
    );
}