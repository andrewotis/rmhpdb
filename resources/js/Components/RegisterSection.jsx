import { useState } from "react";
import Button from "./Button";
import { validate } from 'email-validator';

export default function RegisterSection({ children }) {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = e => {
        setValues({...values, [e.target.id] : e.target.value});
    }

    return (
        <>
            <div className="registration-container">
                <div className="cta-form">
                    <h2>Register</h2>
                    <p>Get started today by filling out the following form.</p>
                </div>
                <form className="registration-form">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        className="form__input" 
                        id="firstName" 
                        value={values.firstName}
                        onChange={handleChange}
                    />
                    <label htmlFor="firstName" className="form__label">First Name</label>
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        className="form__input" 
                        id="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                    />
                    <label htmlFor="lastName" className="form__label">Last Name</label>
                    <input 
                        type="text" 
                        placeholder="Email Address" 
                        className="form__input" 
                        id="email" 
                        value={values.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="email" className="form__label">Email Address</label>
                    <Button 
                        filled
                        disabled={values.firstName.length == 0 || values.lastName.length == 0 || !validate(values.email)}
                    >
                        Register
                    </Button>
                </form>
            </div>
        </>
    );
}