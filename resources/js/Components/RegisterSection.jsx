import { useState, useEffect, useRef } from "react";
import { validate } from 'email-validator';
import { router, usePage } from '@inertiajs/react';
import Button from "./Button";
import Flash from "./Flash";

export default function RegisterSection({ children }) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;

    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: ''
    });

    useEffect(() => {
        if(errors.error || flash.message) {
            window.setTimeout( () => {
                document.querySelector('#registration').scrollIntoView();
            }, 1000);   
        }
    },[errors,flash]);

    const handleChange = e => {
        setValues({...values, [e.target.id] : e.target.value});
    }

    const valid = _ => {
        return values.first_name.length > 0
            && values.last_name.length > 0
                && validate(values.email);
    }

    const handleSubmit = _ => {
        router.post('/register', values);
    }

    return (
        <>
            { flash.message && <Flash type="success" message={flash.message}/> }
            { errors.error && <Flash type="error" message={errors.error}/> }

            <div 
                className="registration-container" 
                id="registration"
            >
                <div className="cta-form">
                    <h2>Register</h2>
                    <p>Get started today by filling out the following form.</p>
                </div>
                <form className="registration-form">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        className="form__input" 
                        id="first_name" 
                        value={values.first_name}
                        onChange={handleChange}
                    />
                    <label htmlFor="first_name" className="form__label">First Name</label>
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        className="form__input" 
                        id="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                    />
                    <label htmlFor="last_name" className="form__label">Last Name</label>
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
                        disabled={!valid()}
                        onClick={valid() ? () => handleSubmit() : undefined}
                    >
                        Register
                    </Button>
                </form>
            </div>
        </>
    );
}