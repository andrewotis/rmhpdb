import { useState } from 'react';
import FloatintLabelInput from '../FloatingLabelInput';
import { maskPhoneNumber } from './../../tools';

export default function NewPersonalInfo({display, values, setValues}) {
    const handleChange = e => {
        setValues({...values, [e.target.id] : e.target.value});
    }

    const filterNumbers = e => {
        const formatted = maskPhoneNumber(e.target.value);

        setValues(values => ({
            ...values,
            phone_number: formatted
        }));
    }

    return (
        <div className={`tab-content${!display ? ' display-none' : ''}`}>
            <FloatintLabelInput
                label="First Name"
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
            />
            <FloatintLabelInput
                label="Last Name"
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
            />
            <FloatintLabelInput
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
            />
            <FloatintLabelInput
                label="Phone Number"
                name="phone_number"
                value={values.phone_number}
                onChange={filterNumbers}
            />
            <FloatintLabelInput
                label="Company"
                name="company"
                value={values.company}
                onChange={handleChange}
            />
        </div>
    );
}