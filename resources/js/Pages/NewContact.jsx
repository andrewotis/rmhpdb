import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { validate } from 'email-validator';
import LayoutFour from '../Layouts/LayoutFour';
import Button from '../Components/Button';

export default function NewContact({auth}) {
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

    return (
        <LayoutFour title="Contact">
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
                    <label for="name" className="form__label">Name</label>
                    <input 
                        type="text" 
                        placeholder="Email Address" 
                        className="form__input" 
                        id="email" 
                        value={values.email}
                        onChange={handleChange}
                    />
                    <label for="email" className="form__label">Email Address</label>
                    <input 
                        type="text" 
                        placeholder="Verify Email" 
                        className="form__input hyde" 
                        id="verifyEmail"
                        value={values.verifyEmail}
                        onChange={handleChange}
                    />
                    <label for="verifyEmail" className="form__label hyde">Verify Email</label>
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        className="form__input" 
                        id="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                    />
                    <label for="phoneNumber" className="form__label">Phone Number</label>
                    <textarea 
                        placeholder="Message"
                        className="form__input"
                        id="message"
                        value={values.message}
                        onChange={handleChange}
                    />
                    <label for="phoneNumber" className="form__label">Message</label>
                    <Button 
                        filled
                        disabled
                    >
                        Send
                    </Button>
                </form>
            </div>
        </LayoutFour>
    );
}