import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { validate } from 'email-validator';
import LayoutFour from '../Layouts/LayoutFour';
import Button from '../Components/Button';
import Flash from '../Components/Flash';

export default function NewContact({auth}) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;
    const [values, setValues] = useState({
        name: '',
        email: '',
        verifyEmail: '',
        phoneNumber: '',
        message: '',
    });

    const handleChange = e => {
        setValues({...values, [e.target.id] : e.target.value});
    }

    const handleSubmit = _ => {
        router.post('/contact', values)
    }

    const inputValid = _ => {
        return validate(values.email) && values.name.length > 0 && values.message.length > 0;
    }

    return (
        <LayoutFour title="Contact" auth={auth}>
            { flash.message && <Flash type="success" message={flash.message}/> }
            { errors.error && <Flash type="error" message={errors.error}/> }
            <div className="registration-container">
                <div className="cta-form">
                    <p>Questions? Feedback? Concerns? Let us know!</p>
                </div>
                <form className="registration-form">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        className="form__input" 
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="name" className="form__label">Name</label>
                    <input 
                        type="text" 
                        placeholder="Email Address" 
                        className="form__input" 
                        id="email" 
                        value={values.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="email" className="form__label">Email Address</label>
                    <input 
                        type="text" 
                        placeholder="Verify Email" 
                        className="form__input hyde" 
                        id="verifyEmail"
                        value={values.verifyEmail}
                        onChange={handleChange}
                    />
                    <label htmlFor="verifyEmail" className="form__label hyde">Verify Email</label>
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        className="form__input" 
                        id="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor="phoneNumber" className="form__label">Phone Number</label>
                    <textarea 
                        placeholder="Message"
                        className="form__input"
                        id="message"
                        value={values.message}
                        onChange={handleChange}
                    />
                    <label htmlFor="phoneNumber" className="form__label">Message</label>
                    <Button 
                        filled
                        disabled={!inputValid()}
                        onClick={inputValid() ? handleSubmit : undefined}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </LayoutFour>
    );
}