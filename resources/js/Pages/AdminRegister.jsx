import { useState, useEffect } from "react";
import { router, usePage } from '@inertiajs/react';
import Flash from "../Components/Flash";
import { maskPhoneNumber } from "../tools";
import { createPasswordValidatorSchema } from "../passwordTools";

export default function AdminRegister( {tokenRecord, auth }) {
    const { errors } = usePage().props;
    const { flash } = usePage().props;
    const [schema, setSchema] = useState(null);
    const [values, setValues] = useState({
        phone_number: '',
        password: '',
        confirm_password: ''
    });

    const inputs = [
        'phone_number', 'password', 'confirm_password'
    ];

    useEffect(() => {
        createPasswordValidatorSchema(setSchema);
    },[]);

    const capitalizeFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const formatSettingName = string => {
        const split = string.replace("_", " ").split(" ");
        let arr = [];
        split.map(s => arr.push(capitalizeFirstLetter(s)));
        return arr.join(" ")
    }

    useEffect(() => {
        let numbers = "";
        for (let i = 0; i < values.phone_number.length; i++) {
            if (!isNaN(values.phone_number[i])) {
                numbers += values.phone_number[i];
            }
        }
        setValues({...values, phone_number: maskPhoneNumber(numbers)})
    },[values.phone_number]);

    const inputValid = _ => {
        return values.phone_number.length == 14 &&
            schema.validate(values.password) &&
                values.password == values.confirm_password
    }

    const displayPasswordErrors = _ => {
        let msg = "";
        if(values.password.length > 0 || values.confirm_password.length > 0) {
            if(values.password !== values.confirm_password) {
                msg += "Passwords must match\n"
            }
            const errors = schema.validate(values.password, {details: true});
            errors.map(err => msg += err.message + "\n")
        }
        return msg;
    }

    const handleSubmit = _ => {
        router.post(`/admin/register/`, {...values, ...tokenRecord});
    }

    return (
        <div className="admin-registration">
            { flash.message && <div style={{backgroundColor: "#fff"}}><Flash type="success" message={flash.message}/></div> }
            { errors.error && <div style={{backgroundColor: "#fff"}}><Flash type="error" message={errors.error}/></div> }
            <table className="admin-registration-table">
                <thead>
                    <tr>
                        <td className="text-align-center"colSpan={2}>Admin Registration</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>{tokenRecord.first_name}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{tokenRecord.last_name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{tokenRecord.email}</td>
                    </tr>
                    {
                        inputs.map(i => {
                            return (
                                <tr key={`inpt-${i}`}>
                                    <td>{formatSettingName(i)}</td>
                                    <td>
                                        <input 
                                            type={i.includes('password') ? 'password' : 'text'} 
                                            name={i}
                                            id={i}
                                            value={values[i]}
                                            onChange={e => setValues({...values, [i] : e.target.value})}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    }
                    <tr>
                        <td>
                            <button
                                disabled={!inputValid()}
                                onClick={inputValid() ? handleSubmit : undefined}
                            >
                                Register
                            </button>
                        </td>
                        <td style={{ whiteSpace: 'pre-line' }} >
                            {
                                displayPasswordErrors()
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    );
}